import express from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

/* AUTHENTICATION */
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import flash from "connect-flash";

import { query } from "./db/index.js";

import usersRouter from "./routes/users.js";
import emojisRouter from "./routes/emojis.js";

const app = express();

console.log("db password in app.js", process.env.PGPASSWORD);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* AUTHENTICATION */
app.use(flash());
passport.use(
    new LocalStrategy(async (username, password, cb) => {
        const sqlString = `SELECT id, username, password FROM users WHERE username = $1;`;
        const data = await query(sqlString, [username]);

        if (data.rows.length > 0) {
            const first = data.rows[0];
            bcrypt.compare(password, first.password, function (err, res) {
                if (res) {
                    cb(null, { id: first.id, username: first.username });
                } else {
                    cb(null, false);
                }
            });
        } else {
            cb(null, false);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const data = await query("SELECT id, username FROM users WHERE id = $1;", [
        parseInt(id, 10),
    ]);
    done(null, data.rows[0]);
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//can access the currentUser in all route handlers
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.get("/", (req, res) => {
    const username = res.locals.currentUser;
    res.render("index", {
        user: res.locals.currentUser,
        message: req.flash("error"),
    });
});

import { getGardensForUser } from "./models/gardens.js";

app.get("/dashboard", async (req, res) => {
    try {
        const username = res.locals.currentUser.username;
        const data = await getGardensForUser(username);
        res.render("dashboard", {
            user: res.locals.currentUser,
            message: req.flash("error"),
            garden: data,
        });
    } catch {
        res.redirect("/");
    }
});

app.get("/sign-up", (req, res) => res.render("sign-up-form", { message: "" }));

import { addUserWithDefaultGarden } from "./models/users.js";

app.post("/sign-up", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const garden = req.body.garden;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            console.log(err);
        } else {
            //const sqlString = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;`;
            try {
                //const data = await query(sqlString, [username, hashedPassword]);
                const data = await addUserWithDefaultGarden(
                    username,
                    hashedPassword,
                    garden
                );
                res.redirect(307, "/log-in");
            } catch {
                res.render("sign-up-form", {
                    message: "ERROR: Username already exists",
                });
            }
        }
    });
});

app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: "Invalid username or password",
    })
);

app.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
});

/* END OF AUTHENTICATION */

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/api/emojis", emojisRouter);

/* GARDEN ROUTE */
app.get("/garden", (req, res) => {
    try {
        res.render("garden", {
            user: res.locals.currentUser,
            garden: res.locals.currentGarden,
        });
    } catch {
        res.redirect("/");
    }
});
/* ******************** */

app.use(function (req, res, next) {
    res.status(404).json({
        message: "We couldn't find what you were looking for 😞",
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json(err);
});

export default app;
