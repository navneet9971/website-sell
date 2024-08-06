// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
