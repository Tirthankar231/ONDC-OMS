// authMiddleware.js
import jwt from 'jsonwebtoken';
import users from '../lib/bootstrap/users.js';

// Secret key for JWT signing
const secretKey = 'mysecret';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if the token is for the bootstrap user
  const bootstrapUserToken = generateAccessToken(users[0]);

  if (!token) {
    return res.sendStatus(401)
  }

  if (token === `Bearer ${bootstrapUserToken}`) {
    // Skip authentication for the bootstrap user
    console.log("Skipping authentication for bootstrap user");
    next();
  } else {
    // Authenticate other users
    jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user;
      next();
    });
  }
};

// Function to generate JWT token
const generateAccessToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: '15m' });
};

export { authenticateToken, generateAccessToken };
