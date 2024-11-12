// backend/routes/authRoutes.js
const express = require('express');
const { register, login, authenticateToken } = require('../controllers/auth');
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access to protected route', user: req.user });
});

module.exports = router;
