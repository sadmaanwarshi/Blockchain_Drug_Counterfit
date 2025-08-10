// middlewares/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // { id: ..., role: ... }
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied: Only " + role + "s can perform this action" });
    }
    next();
  };
}

module.exports = { authenticateJWT, authorizeRole };
