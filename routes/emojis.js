import express from "express";
const router = express.Router();

import { addEmoji } from "../models/emojis.js";

/* READ */
router.get("/", (req, res) => {
    res.json({ message: "here is an emoji!" });
});

/* CREATE */
router.post("/", async (req, res) => {
    const { code, xPos, yPos } = req.body;
    const data = addEmoji(code, xPos, yPos);
    res.json({
        success: true,
        payload: data.rows
    });
});

export default router;
