import express from "express";
const router = express.Router();

import { getEmojis, addEmoji, getEmojiById, updateEmojiCodeById, getEmojisByUsername } from "../models/emojis.js";

/* READ */
/*
router.get("/", async (req, res) => {
    const data = await getEmojis();
    res.json({ success: true, payload: data.rows});
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const data = await getEmojiById(id);
    res.json({ success: true, payload: data.rows});
});
*/

router.get("/:username", async (req, res) => {
    const data = await getEmojisByUsername(req.params.username);
    res.json({success: true, payload: data.rows});
});

/* CREATE */
router.post("/", async (req, res) => {
    const { username, code, xPos, yPos } = req.body;
    const data = await addEmoji(username, Number(code), Number(xPos), Number(yPos));
    res.json({
        success: true,
        payload: data.rows
    });
});

/* UPDATE */
router.patch("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const newCode = req.body.code;
    const data = await updateEmojiCodeById(id, newCode);
    res.json({
        success: true,
        payload: data.rows
    })
});

export default router;
