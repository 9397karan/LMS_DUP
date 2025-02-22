const express = require("express");
const router = express.Router();
const Meeting = require("../models/meetingModel");
const crypto = require("crypto");

// Create a new meeting
router.post("/create", async (req, res) => {
  try {
    const { instructorId, meetingTitle, meetingTime } = req.body;

    if (!instructorId || !meetingTitle || !meetingTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const meetingID = crypto.randomBytes(4).toString("hex"); // Generate unique meeting ID
    const meetingLink = `https://frontend-ds2x.onrender.com/meeting/${meetingID}`;

    const newMeeting = new Meeting({
      instructorId,
      meetingTitle,
      meetingTime,
      meetingID,
      meetingLink,
    });

    await newMeeting.save();
    res.status(201).json({ message: "Meeting Created", meeting: newMeeting });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all meetings for an instructor
router.get("/instructor/:id", async (req, res) => {
  try {
    const meetings = await Meeting.find({ instructorId: req.params.id });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark meeting as completed
router.put("/complete/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { isCompleted: true },
      { new: true }
    );
    res.json({ message: "Meeting marked as completed", meeting });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/undo/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { isCompleted: false },
      { new: true }
    );
    res.json({ message: "Meeting marked as completed", meeting });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
