import { query } from "../src/db/index.js";

const sqlString = `TRUNCATE gardens RESTART IDENTITY CASCADE;`;

async function resetGardensTable() {
    const res = await query(sqlString);
    console.log("Table reset", res);
}

resetGardensTable();
