const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use the secret key from environment variables
    req.user = await User.findById(decoded.userId).select("-password"); // Get user details
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
