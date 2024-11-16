import express from "express";
import { authMiddleware } from "../middleware.js";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/postControllers.js";

const postRouter = express.Router();

// Route to create a new post
postRouter.post("/posts", authMiddleware, createPost);

// Route to get all posts for any user
postRouter.get("/posts", getAllPosts);

// Route to get all posts of the logged-in user
postRouter.get("/posts/me", authMiddleware, getUserPosts);

export default postRouter;
