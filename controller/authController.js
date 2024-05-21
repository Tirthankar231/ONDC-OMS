// controllers/auth.js
import jwt from 'jsonwebtoken';
import { models } from '../models/index.js';
import users from '../lib/bootstrap/users.js'
import { generateAccessToken } from '../mddleware/auth.js'

// Controller function to handle user registration
export const createUser = async (req, res) => {
    try {
        const { email, name, password, role } = req.body;
        const user = await models.User.create({ email, name, password, role });
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user.' });
    }
};

// Controller function to handle user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await models.User.findOne({ where: { email } });
        // If user does not exist, create them
        if (!user) {
            // Find bootstrap user
            const bootstrapUser = users.find(user => user.email === email);
            if (!bootstrapUser) {
                return res.status(404).json({ message: 'User not found.' });
            }
            // Create user in the database
            user = await models.User.create(bootstrapUser);
        }
        // Check password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Generate JWT token for authentication
        const token = generateAccessToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to login.' });
    }
};
