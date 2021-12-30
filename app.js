import express from 'express';
import path from 'path';

import __dirname  from './dirname.js';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';
import logger  from 'morgan';

/* AUTHENTICATION */
import session from "express-session";
import passport from "passport";
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';

import usersRouter  from './routes/users.js';
import emojisRouter from './routes/emojis.js';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* AUTHENTICATION */
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    /*
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
    */
    const sqlString = `SELECT id, username, password FROM users WHERE username = $1;`;
    const data = await query(sqlString, [username]);

    
    if(data.rows.length > 0) {
      const first = data.rows[0];
      
      bcrypt.compare(password, first.password, function(err, res) {
        if(res) {
          cb(null, { id: first.id, username: first.username })
         } else {
          cb(null, false)
         }
       })
     } else {
       cb(null, false)
     }
     

     /*
    if (data.rows.length > 0) {
      const first = data.rows[0];
      console.log("username", first.username);
      if (password === first.password) {
        cb(null, { id: first.id, username: first.username })
      } else {
        cb(null, false);
      }
    } else {
      cb(null, false);
    } 
    */    
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const data = await query('SELECT id, username FROM users WHERE id = $1;', [parseInt(id, 10)]);
  done(null, data.rows[0]);
})

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});
app.get("/sign-up", (req, res) => res.render("sign-up-form"));

import { query } from "./db/index.js";
app.post("/sign-up", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    if (err) {
      console.log(err);
    } else {
      const sqlString = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;`;
      const data = await query(sqlString, [username, hashedPassword]);
      res.json({
        success: true,
        payload: data.rows
      });
    }
  });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});


//app.post('/login', passport.authenticate('local'), users.login)

/* END OF AUTHENTICATION */

/*
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
*/
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', usersRouter);
app.use('/api/emojis', emojisRouter);

/* GARDEN ROUTE */
app.get('/garden', (req, res) => {
  res.render("garden");
})
/* ******************** */

app.use(function (req, res, next) {
  res.status(404).json({message: "We couldn't find what you were looking for 😞"})
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
})

export default app;