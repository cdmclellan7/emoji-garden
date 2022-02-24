import { query } from "../src/db/index.js";

const sqlString = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
);`;

async function createUsersTable() {
    const res = await query(sqlString);
    console.log("Created emojis table", res);
}

createUsersTable();
