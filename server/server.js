import express from "express";
import 'dotenv/config';
import cors from "cors";

import connectDB from "./Config/mongodb.js";
import userRouter from "./routes/user.routes.js";
import imgRouter from "./routes/img.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Allow only your Netlify frontend
const allowedOrigins = ['https://genai04.netlify.app/']; 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy does not allow this origin"), false);
    }
  },
  credentials: true,
}));

// Middlewares
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imgRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
