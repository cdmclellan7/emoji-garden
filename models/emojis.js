import query from '../db/index.js';

/* READ */
export async function getEmojis() {
    const sqlString = `SELECT * FROM emojis;`;
    const res = await query(sqlString);
    return res;
}


/* CREATE */
export async function addEmoji(code, xPos, yPos) {
    const sqlString = `INSERT INTO emojis (dec_code, x_position, y_position) VALUES ($1, $2, $3) RETURNING *;`;
    const res = await query(sqlString, [code, xPos, yPos]);
    return res;
}