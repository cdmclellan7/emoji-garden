import { query } from '../index.js';

const sqlString = `TRUNCATE users RESTART IDENTITY CASCADE;`;

async function resetUsersTable() {
    const res = await query(sqlString);
    console.log("Table reset", res);
}

resetUsersTable();