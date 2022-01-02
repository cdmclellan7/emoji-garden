import { query } from '../db/index.js';

/* READ */
export async function getUserByUsername(username) {
    const sqlString = `SELECT * FROM users WHERE username = $1;`;
    const res = await query(sqlString, [username]);
    return res.rows[0];
}

/* CREATE */
export async function addUserWithDefaultGarden(username, password, gardenName) {
    const sqlString = `
    with new_user as (
        INSERT INTO users (username, password)
        values ($1, $2)
        returning id
    )
    INSERT INTO gardens (user_id, name)
    SELECT id, $3
    FROM new_user;`

    const res = await query(sqlString, [username, password, gardenName]);
    return res.rows;
}