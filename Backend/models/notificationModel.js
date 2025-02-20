const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Student who requests a call
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Instructor who receives the request
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    replies: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who sent the reply
       meetingInfo:String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  }
);
module.exports = mongoose.model("Notification", notificationSchema);
