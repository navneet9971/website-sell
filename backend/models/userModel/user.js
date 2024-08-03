// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
