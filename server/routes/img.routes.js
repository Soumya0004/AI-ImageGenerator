import express from "express";
import generateImg from "../controllers/generateImg.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Protected route
router.post("/generateimg", auth, generateImg);

export default router;
