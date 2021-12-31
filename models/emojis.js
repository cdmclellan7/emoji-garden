import { query } from '../db/index.js';
import { getUserByUsername } from './users.js';

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
    const sqlString = `SELECT * FROM emojis INNER JOIN users ON emojis.user_id = users.id WHERE users.username = $1;`
    const res = await query(sqlString, [username]);
    return res;
}


/* CREATE */
export async function addEmoji(username, code, xPos, yPos) {
    const user = await getUserByUsername(username);
    const userId = user.id;
    
    const sqlString = `INSERT INTO emojis (user_id, dec_code, x_position, y_position) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const res = await query(sqlString, [userId, code, xPos, yPos]);
    return res;
}

/* UPDATE */
export async function updateEmojiCodeById(id, code) {
    const sqlString = `UPDATE emojis SET dec_code = $1 WHERE id = $2 RETURNING *;`;
    const res = await query(sqlString, [code, id]);
    return res;

}