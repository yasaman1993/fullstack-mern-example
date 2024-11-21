import jwt from "jsonwebtoken";
import User from "./models/User.js";

// Authorization middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ error: "Unauthorized: No token provided" });
  }



  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });
    req.user = user;  // Attach decoded user info to the request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).send();
  }
};
