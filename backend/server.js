import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

await mongoose.connect(process.env.DB_URI);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://fullstack-mern-example-frontend-x052.onrender.com'],
    credentials: true,
  })
);

app.use(cookieParser());

// Use routes
app.use("/", userRouter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
