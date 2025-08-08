import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/mongodb.js";

import userRouter from "./routes/user.routes.js";
import imgRouter from "./routes/img.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration - cleaner and safer
app.use(
  cors({
    origin: [
      "https://genai04.netlify.app", // production
      "http://localhost:5173"        // development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imgRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
