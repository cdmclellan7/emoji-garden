import { query } from '../db/index.js';
import { getUserByUsername } from './users.js';

/* READ */
export async function getGardenByUsernameAndName(username, gardenName) {
    const sqlString = `SELECT gardens.id, gardens.user_id, gardens.name FROM gardens INNER JOIN users ON gardens.user_id = users.id WHERE username = $1 AND gardens.name = $2;`;
    const res = await query(sqlString, [username, gardenName]);
    return res.rows[0];
}

/* CREATE */
export async function addGarden(username, gardenName) {
    const user = getUserByUsername(username);
    const userId = user.id;

    const sqlString = `INSERT INTO gardens (user_id, name) VALUES ($1, $2) RETURNING *;`
    const res = await query(sqlString, [userId, gardenName]);
    return res.rows;
}
