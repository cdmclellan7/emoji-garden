import query from '../db/index.js';

/* READ */
export function getEmojis() {
    const sqlString = `SELECT * FROM emojis;`;
    const res = query(sqlString);
    return res.rows;
}


/* CREATE */
export function addEmoji(code, xPos, yPos) {
    const sqlString = `INSERT INTO emojis (code, x_position, y_position) VALUES ($1, $2, $3) RETURNING *;`;
    const res = query(sqlString, [code, xPos, yPos]);
    return res.rows;
}