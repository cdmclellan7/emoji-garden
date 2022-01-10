import { query } from '../db/index.js';
import { getUserByUsername } from './users.js';
import { getGardenByUsernameAndName } from './gardens.js'

/* READ */
export async function getEmojis() {
    const sqlString = `SELECT * FROM emojis;`;
    const res = await query(sqlString);
    return res;
}

export async function getEmojiById(id) {
    const sqlString = `SELECT * FROM emojis WHERE id = $1;`;
    const res = await query(sqlString, [id]);
    return res;
}

export async function getEmojisByUsername(username) {
    const sqlString = `SELECT * FROM emojis INNER JOIN gardens ON emojis.garden_id = gardens.id INNER JOIN users ON gardens.user_id = users.id WHERE users.username = $1;`
    const res = await query(sqlString, [username]);
    return res;
}


/* CREATE */
export async function addEmoji(username, gardenName, code, xPos, yPos) {
    const garden = await getGardenByUsernameAndName(username, gardenName);
    const gardenID = garden.id;
    
    const sqlString = `INSERT INTO emojis (garden_id, dec_code, x_position, y_position) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const res = await query(sqlString, [gardenID, code, xPos, yPos]);
    return res;
}

/* UPDATE */
export async function updateEmojiCodeById(id, code) {
    const sqlString = `UPDATE emojis SET dec_code = $1 WHERE id = $2 RETURNING *;`;
    const res = await query(sqlString, [code, id]);
    return res;

}