// app.js
import express from 'express';
import sellerRoute from './routes/sellerRoute.js';
import orderRoute from './routes/orderRoute.js';
import settlementRoute from './routes/settlementRoute.js';
import issueRoute from './routes/issueRoute.js';
import returnRoute from './routes/returnRoute.js';
import sequelize from './config/db.js';
import users from './lib/bootstrap/users.js';
import { generateAccessToken } from './mddleware/auth.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to authenticate and get JWT token
app.post('/login', (req, res) => {
  // Authenticate user (e.g., check credentials against database)
  const user = users[0]; // Using the first user for simplicity
  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
});

// Register user routes
app.use(sellerRoute)
app.use(orderRoute)
app.use(settlementRoute)
app.use(issueRoute)
app.use(returnRoute)

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });