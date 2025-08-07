import express from "express";
import 'dotenv/config';
import cors from "cors";
import connectDB from "./Config/mongodb.js";

import userRouter from "./routes/user.routes.js";
import imgRouter from "./routes/img.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS config
const allowedOrigins = ['https://genai04.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed"), false);
  },
  credentials: true,
}));

app.use(express.json());

// ✅ DB connection
connectDB();

// ✅ Routes (make sure these paths are correct)
app.use("/api/user", userRouter);
app.use("/api/image", imgRouter);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
