// controllers/postController.js
import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Create a new post with the title, description, and author (user's ID from JWT)
    const newPost = await Post.create({
      title,
      description,
      author: req.user._id, // current user from JWT token
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ error: "Post could not be created." });
  }
};

// Get all posts for any user
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Posts could not be retrieved." });
  }
};

// Get all posts of the logged-in user
export const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.user._id });
    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error retrieving user posts:", error);
    res.status(500).json({ error: "User posts could not be retrieved." });
  }
};
