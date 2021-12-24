import express from "express";
const router = express.Router();

/* GET emojis listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "here is an emoji!" });
});

export default router;
