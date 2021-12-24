import express from "express";
const router = express.Router();

import { getEmojis, addEmoji } from "../models/emojis.js";

/* READ */
router.get("/", async (req, res) => {
    const data = await getEmojis();
    res.json({ success: true, payload: data.rows});
});

/* CREATE */
router.post("/", async (req, res) => {
    const { code, xPos, yPos } = req.body;
    const data = await addEmoji(Number(code), Number(xPos), Number(yPos));
    res.json({
        success: true,
        payload: data.rows
    });
});

export default router;
