// backend/models/LoginActivity.js
const mongoose = require('mongoose');

const LoginActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loginTime: { type: Date, default: Date.now },
    ipAddress: String,
    device: String,
    suspicious: { type: Boolean, default: false }
});

module.exports = mongoose.model('LoginActivity', LoginActivitySchema);
