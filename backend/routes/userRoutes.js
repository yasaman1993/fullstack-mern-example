import express from "express";
import {
  getReports,
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify/:token", verifyUser);
userRouter.get("/reports", authMiddleware, getReports);

export default userRouter;
