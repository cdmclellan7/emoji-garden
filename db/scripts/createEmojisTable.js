import query from '../index.js';

const sqlString = `CREATE TABLE IF NOT EXISTS emojis (
    id SERIAL PRIMARY KEY,
    dec_code INTEGER
);`;

async function createEmojisTable() {
    const res = await query(sqlString);
    console.log("Created emojis table", res)
}

createEmojisTable();