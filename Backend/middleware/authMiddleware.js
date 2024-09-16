const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  // Get the token from the "Authorization" header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // If the token is invalid or expired, send a 403 Forbidden response
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Save the decoded user info (like role) into req.user
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = authenticateJWT;
