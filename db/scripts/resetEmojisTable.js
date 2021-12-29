import { query } from '../index.js';

const sqlString = `TRUNCATE emojis RESTART IDENTITY;`;

async function resetEmojisTable() {
    const res = await query(sqlString);
    console.log("Table reset", res);
}

resetEmojisTable();