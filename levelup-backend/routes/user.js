const express = require("express");
const auth = require("../middleware/auth");
const Image = require("../models/Image");
const User = require("../models/User");

const router = express.Router();

router.get("/proofs", auth, async (req, res) => {
  try {
    const proofs = await Image.find({ userId: req.user.id }).sort({ uploadedAt: -1 });
    res.json(proofs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch proofs." });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json({ xp: user.xp, streak: user.streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/leaderboard", async (req, res) => {
  const users = await User.find({})
    .sort({ xp: -1 })
    .select("username xp streak")
    .limit(10);

  res.json(users);
});

module.exports = router;
