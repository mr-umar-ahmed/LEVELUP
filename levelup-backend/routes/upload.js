const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const Image = require("../models/Image");
const auth = require("../middleware/auth");
const fakeImageClassifier = require("../utils/aiMock");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", auth, upload.single("proof"), async (req, res) => {
  const userId = req.user.id;

  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  const hash = crypto.createHash("sha256").update(req.file.buffer).digest("hex");

  try {
    const existing = await Image.findOne({ hash });
    if (existing) return res.status(409).json({ message: "Duplicate image detected." });

    const isValid = await fakeImageClassifier(req.file.buffer);
    if (!isValid) return res.status(403).json({ message: "Invalid image content." });

    const newImage = new Image({
      hash,
      status: "pending",
      url: "https://via.placeholder.com/200", // Replace with Cloudinary URL if needed
      userId,
    });

    await newImage.save();

    res.status(200).json({ message: "Proof accepted!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
