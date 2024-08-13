const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, default: '', required: true }
});

module.exports = mongoose.model('User', UserSchema)
