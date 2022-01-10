import { query } from '../index.js';

const sqlString = `CREATE TABLE IF NOT EXISTS emojis (
    id SERIAL PRIMARY KEY,
    garden_id INTEGER REFERENCES gardens (id),
    dec_code INTEGER,
    x_position INTEGER,
    y_position INTEGER
);`;

async function createEmojisTable() {
    const res = await query(sqlString);
    console.log("Created emojis table", res)
}

createEmojisTable();