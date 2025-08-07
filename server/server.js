import express from "express";
import 'dotenv/config';
import cors from "cors";

import connectDB from "./Config/mongodb.js";
import userRouter from "./routes/user.routes.js";
import imgRouter from "./routes/img.routes.js";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB before starting the server
connectDB();

// ✅ Middleware: Parse JSON
app.use(express.json());

// ✅ CORS configuration
const allowedOrigins = ['https://genai04.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow this origin"), false);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/image', imgRouter);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
