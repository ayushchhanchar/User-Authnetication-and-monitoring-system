// backend/controllers/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LoginActivity = require('../models/LoginActivity');
require('dotenv').config();


// Helper function to get client IP
const getClientIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    return forwarded ? forwarded.split(',')[0] : req.ip;
};


// Register a new user
const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is taken
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'Username already exists' });

        // Create a new user
        user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Log in a user and generate a JWT
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        console.log(token);

        // Log the login activity
        const ipAddress = getClientIp(req);
        const activity = new LoginActivity({
            userId: user._id,
            ipAddress: ipAddress,
            device: req.headers['user-agent']
        });
        await activity.save();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};
// Get all login activities
const getLoginActivity = async (req, res) => {
    try {
        // Check if the user has admin privileges
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Access denied. Admins only.' });
        // }

        // Fetch login activities from the database
        const activities = await LoginActivity.find().populate('userId', 'username');

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    register,
    login,
    authenticateToken,
    getLoginActivity
};
