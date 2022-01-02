import { query } from '../index.js';

const sqlString = `CREATE TABLE IF NOT EXISTS gardens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    name TEXT
);`;

async function createGardensTable() {
    const res = await query(sqlString);
    console.log("Created gardens table", res)
}

createGardensTable();