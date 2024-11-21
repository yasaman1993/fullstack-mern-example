import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";

await mongoose.connect(process.env.DB_URI);

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://fullstack-mern-example-1-71g5.onrender.com"],
    credentials: true,
  })
);

app.use(cookieParser());

// Use routes
app.use("/", userRouter);
app.use("/", postRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
