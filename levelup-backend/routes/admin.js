const express = require("express");
const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const Image = require("../models/Image");
const User = require("../models/User");

const router = express.Router();

router.get("/proofs", auth, requireAdmin, async (req, res) => {
  try {
    const proofs = await Image.find().sort({ uploadedAt: -1 });
    res.json(proofs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch proofs." });
  }
});

router.post("/approve/:id", auth, requireAdmin, async (req, res) => {
  try {
    const proof = await Image.findById(req.params.id);
    if (!proof || proof.status === "approved") {
      return res.status(400).json({ message: "Invalid or already approved" });
    }

    proof.status = "approved";
    await proof.save();

    const user = await User.findById(proof.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (user.lastStreakDate === today) {
      return res.json({ message: "Proof approved. No additional XP awarded." });
    }

    user.xp += 10;
    user.streak = user.lastStreakDate === yesterday ? user.streak + 1 : 1;
    user.lastStreakDate = today;
    await user.save();

    return res.json({ message: "Proof approved. XP and streak updated." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/reject/:id", auth, requireAdmin, async (req, res) => {
  try {
    await Image.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Proof rejected." });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject proof." });
  }
});

module.exports = router;
