const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meetingTitle: { type: String, required: true },
  meetingTime: { type: Date, required: true },
  meetingID: { type: String, required: true, unique: true },
  meetingLink: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Meeting", meetingSchema);
