// app.js
import express from 'express';
import sellerRoute from './routes/sellerRoute.js';
import orderRoute from './routes/orderRoute.js';
import settlementRoute from './routes/settlementRoute.js';
import issueRoute from './routes/issueRoute.js';
import returnRoute from './routes/returnRoute.js';
import migrationRoute from './routes/migrationRoute.js';
import userRoute from './routes/userRoute.js';
import { models } from './models/index.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Register user routes
app.use(sellerRoute)
app.use(orderRoute)
app.use(settlementRoute)
app.use(issueRoute)
app.use(returnRoute)
app.use(migrationRoute)
app.use(userRoute)

// Synchronize models with the database
models.sequelize.sync()
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
