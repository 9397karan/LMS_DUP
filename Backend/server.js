const express = require("express");
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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://frontend-ds2x.onrender.com",
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




// Start Server
app.listen(5000, () => {
  console.log("Listening on port 5000...");
});
