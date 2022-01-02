import { query } from '../index.js';

const sqlString = `TRUNCATE gardens RESTART IDENTITY;`;

async function resetGardensTable() {
    const res = await query(sqlString);
    console.log("Table reset", res);
}

resetGardensTable();