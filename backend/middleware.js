import jwt from "jsonwebtoken";

// Authorization middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send();
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
  if (!token) {
    return res.status(401).send();
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;  // Attach decoded user info to the request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).send();
  }
};
