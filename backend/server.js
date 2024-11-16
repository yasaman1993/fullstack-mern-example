import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

await mongoose.connect(process.env.DB_URI);

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Use routes
app.use("/api", userRouter);
app.use("/api", postRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:5000`);
});
