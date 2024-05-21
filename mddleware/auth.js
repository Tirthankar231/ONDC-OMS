import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { models } from '../models/index.js';

// Secret key for JWT signing
const secretKey = 'mysecret';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.sendStatus(500); // Internal Server Error
    }

    if (!user) {
      return res.status(401).send(info.message); 
    }

    // Check if the user role is SUPER_ADMIN or ADMIN
    if (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN') {
      return res.status(403).send('Forbidden: User does not have permission to authenticate.'); 
    }

    req.user = user;
    return next();
  })(req, res, next);
};


// Function to generate JWT token
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: '15m' });
};

// Define a local strategy for Passport
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      // Find user by username (assuming email is used as username)
      const user = await models.User.findOne({ where: { email: username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Validate password (for demonstration purposes, skipping password validation)
      // You should implement a secure password validation mechanism here

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// JWT strategy for Passport
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  if (Date.now() > jwt_payload.exp * 1000) {
    // Token has expired
    return done(null, false, { message: 'Token has expired' });
  }

  models.User.findOne({where: { email: jwt_payload.email }})
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'User not found.' });
      }
    })
    .catch(err => done(err, false));
}));


export { authenticateToken, generateAccessToken };
