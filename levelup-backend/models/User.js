const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // hashed
  xp: { type: Number, default: 0 }, // User's experience points
  streak: { type: Number, default: 0 }, // User's streak count
  createdAt: { type: Date, default: Date.now }, // Timestamp of user creation
  lastStreakDate: { type: String, default: "" }, // Use to track daily streaks
  role: { type: String, default: "user" }, // Can be "user" or "admin"
});

module.exports = mongoose.model("User", UserSchema);