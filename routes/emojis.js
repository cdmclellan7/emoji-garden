import express from "express";
const router = express.Router();

import { getEmojis, addEmoji, getEmojiById } from "../models/emojis.js";

/* READ */
router.get("/", async (req, res) => {
    const data = await getEmojis();
    res.json({ success: true, payload: data.rows});
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const data = await getEmojiById(id);
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
