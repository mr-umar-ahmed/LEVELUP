const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define Image Schema
const ImageSchema = new mongoose.Schema({
  hash: String,
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  url: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const ImageModel = mongoose.model("Image", ImageSchema);

// Define User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: null },
  lastStreakDate: { type: String, default: "" },
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", UserSchema);

// AI Mock Verification Function
const fakeImageClassifier = async (imageBuffer) => {
  const result = Math.random() > 0.3 ? "valid" : "invalid"; // 70% success
  return result === "valid";
};

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

// Middleware to check admin role
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin access only." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// 🧩 Admin Routes

app.get("/admin/proofs", auth, requireAdmin, async (req, res) => {
  try {
    const proofs = await ImageModel.find().sort({ uploadedAt: -1 });
    res.json(proofs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch proofs." });
  }
});

app.post("/admin/approve/:id", auth, requireAdmin, async (req, res) => {
  try {
    const proof = await ImageModel.findById(req.params.id);
    if (!proof || proof.status === "approved") {
      return res.status(400).json({ message: "Invalid or already approved" });
    }

    proof.status = "approved";
    await proof.save();

    const user = await User.findById(proof.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString(); // 1 day ago
    const lastStreakDate = user.lastStreakDate || "";

    if (lastStreakDate === today) {
      return res.json({ message: "Proof approved. No additional XP awarded." });
    }

    user.xp += 10;
    if (lastStreakDate === yesterday) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
    user.lastStreakDate = today;
    await user.save();

    return res.json({ message: "Proof approved. XP and streak updated." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

app.post("/admin/reject/:id", auth, requireAdmin, async (req, res) => {
  try {
    await ImageModel.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Proof rejected." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject proof." });
  }
});

// Upload route
app.post("/upload", auth, upload.single("proof"), async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const hash = crypto.createHash("sha256").update(req.file.buffer).digest("hex");

  try {
    const existing = await ImageModel.findOne({ hash });
    if (existing) {
      return res.status(409).json({ message: "Duplicate image detected." });
    }

    const isValid = await fakeImageClassifier(req.file.buffer);
    if (!isValid) {
      return res.status(403).json({ message: "Invalid image content." });
    }

    const newImage = new ImageModel({
      hash,
      status: "pending",
      url: "http://localhost:5173/sample-image.jpg",
      userId: userId,
    });

    await newImage.save();

    res.status(200).json({ message: "Proof accepted!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// 🔧 Authentication Routes
const JWT_SECRET = process.env.JWT_SECRET || "levelup_secret";

app.post("/auth/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashed });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// 🔧 Fetch User-Specific Proofs
app.get("/user/proofs", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const proofs = await ImageModel.find({ userId }).sort({ uploadedAt: -1 });
    res.json(proofs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch proofs." });
  }
});

// 🔧 Fetch Authenticated User's Data
app.get("/user/me", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ xp: user.xp, streak: user.streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// 🏆 Leaderboard Route (Top 10 Users by XP)
app.get("/leaderboard", async (req, res) => {
  const users = await User.find({})
    .sort({ xp: -1 })
    .select("username xp streak")
    .limit(10); // top 10 users

  res.json(users);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});