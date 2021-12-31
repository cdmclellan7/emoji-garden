import { query } from '../db/index.js';

/* READ */
export async function getUserByUsername(username) {
    const sqlString = `SELECT * FROM users WHERE username = $1;`;
    const res = await query(sqlString, [username]);
    return res;
}