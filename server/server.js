import express from "express";
import 'dotenv/config';
import cors from "cors";

import connectDB from "./Config/mongodb.js";
import userRouter from "./routes/user.routes.js";
import imgRouter from "./routes/img.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
 connectDB();


app.use('/api/user',userRouter )
app.use('/api/image',imgRouter )
app.get("/", (req, res) => {
    res.send("Hello from server");
});

app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`);
});
