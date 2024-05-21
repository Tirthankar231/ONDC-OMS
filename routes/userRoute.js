// routes/user.js

import express from 'express';
import { createUser, loginUser } from '../controller/authController.js';

const router = express.Router();

// User registration endpoint
router.post('/register', createUser);

// User login endpoint
router.post('/login', loginUser);

export default router;
