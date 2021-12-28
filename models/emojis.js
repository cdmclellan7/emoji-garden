import { query } from '../db/index.js';

/* READ */
export async function getEmojis() {
    const sqlString = `SELECT * FROM emojis;`;
    const res = await query(sqlString);
    return res;
}

export async function getEmojiById(id) {
    const sqlString = `SELECT * FROM emojis WHERE id = $1;`;
    const res = query(sqlString, [id]);
    return res;
}


/* CREATE */
export async function addEmoji(code, xPos, yPos) {
    const sqlString = `INSERT INTO emojis (dec_code, x_position, y_position) VALUES ($1, $2, $3) RETURNING *;`;
    const res = await query(sqlString, [code, xPos, yPos]);
    return res;
}

/* UPDATE */
export async function updateEmojiCodeById(id, code) {
    const sqlString = `UPDATE emojis SET dec_code = $1 WHERE id = $2 RETURNING *;`;
    const res = await query(sqlString, [code, id]);
    return res;

}