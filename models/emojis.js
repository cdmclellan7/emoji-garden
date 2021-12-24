import query from '../db/index.js';



export function addEmoji(code, xPos, yPos) {
    const sqlString = `INSERT INTO emojis (code, x_position, y_position) VALUES ($1, $2, $3) RETURNING *;`;

    const res = query(sqlString, [code, xPos, yPos]);
    return res.rows;
}