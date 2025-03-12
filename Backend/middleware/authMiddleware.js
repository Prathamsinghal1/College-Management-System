const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Token Missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach decoded user details to request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};

// Middleware to check admin role
const checkAdminRole = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Admin Only' });
  }
  next();
};

module.exports = { authenticateToken, checkAdminRole };
