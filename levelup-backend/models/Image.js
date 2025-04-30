const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  hash: { type: String, required: true },           // to detect duplicates
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  url: { type: String, required: true },             // image URL (could be a file path or cloud URL)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Image", ImageSchema);
