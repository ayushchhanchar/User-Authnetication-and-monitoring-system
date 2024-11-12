// backend/routes/authRoutes.js
const express = require('express');
const { register, login, authenticateToken, getLoginActivity } = require('../controllers/auth');
const LoginActivity = require('../models/LoginActivity');
const router = express.Router();


// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/log',getLoginActivity)

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access to protected route', user: req.user });
});

module.exports = router;
