const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const instructorRoute = require("./routes/instructorRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const userRoutes = require("./routes/userRoutes");
const purchaseRoutes = require("./routes/coursePurchase");
const questionRoute = require("./routes/questionRoute");
const certificateRoutes = require("./routes/certificateRoutes");
const notificationRoutes = require("./routes/notificationRoute");
const meetingRoutes=require("./routes/meetingRoutes")
const { dbConnect } = require("./utils/db");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "https://frontend-ds2x.onrender.com/",
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://frontend-ds2x.onrender.com/",
    credentials: true,
  })
);

// Connect Database
dbConnect();

// Routes
app.use("/course", instructorRoute);
app.use("/lecture", lectureRoutes);
app.use("/user", userRoutes);
app.use("/api", purchaseRoutes);
app.use("/api/questions", questionRoute);
app.use("/api/meetings",meetingRoutes)
app.use("/api/certificates", certificateRoutes);
app.use("/api/notifications", notificationRoutes);

// Track connected users
const connectedUsers = {};

// Socket.io for Real-time Notifications
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Store user socket ID
  socket.on("register", (userId) => {
    connectedUsers[userId] = socket.id;
  });

  // Send notification to a specific user
  socket.on("send_notification", async ({ recipientId, message }) => {
    if (connectedUsers[recipientId]) {
      io.to(connectedUsers[recipientId]).emit("receive_notification", message);
    }
    await saveNotification(recipientId, message);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    Object.keys(connectedUsers).forEach((key) => {
      if (connectedUsers[key] === socket.id) delete connectedUsers[key];
    });
  });
});

// Function to Save Notifications to Database
const Notification = require("./models/notificationModel");
const saveNotification = async (userId, message) => {
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
  } catch (err) {
    console.error("Error saving notification:", err);
  }
};

// Start Server
server.listen(5000, () => {
  console.log("Listening on port 5000...");
});
