const express = require("express");
const Notification = require("../models/notificationModel");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    // Fetch notifications where the user is the sender or receiver
    const notifications = await Notification.find({
      $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.post("/add", async (req, res) => {
  try {
      const { senderId, receiverId, message } = req.body;

      if (!senderId || !receiverId || !message) {
          return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      // Save notification to database
      const notification = new Notification({
          senderId,
          receiverId,
          message,
          isRead: false,
          replies: [],
      });

      await notification.save();

      res.status(201).json({ success: true, message: "Notification sent!", notification });
  } catch (error) {
      console.error("Error saving notification:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});


router.put("/reply/:id", async (req, res) => {
  try {
    const { meetingInfo, senderId } = req.body;

    // Log request body for debugging
    console.log("Incoming Reply Request:", req.body);

    // Validate required fields
    if (!meetingInfo|| !senderId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the notification
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Ensure the instructor is replying
    const reply = {
      senderId, // The instructor who is replying
      meetingInfo,
      createdAt: new Date(),
    };

    notification.replies.push(reply);
    notification.isRead = true; // Mark as read
    await notification.save();

    res.json({ message: "Reply sent successfully", notification });
  } catch (error) {
    console.error("Error processing reply:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
