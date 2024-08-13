const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String,  required: true},
  bio: { type: String},
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, default: '', required: true },
  city: {type: String},
  state: { type: String},
  address: { type: String},
  date_of_birth: {type: String },
  phoneNumber: {type: String},
  twitter: { type: String},
  facebook: { type: String},
  linkedin: { type: String},
  gitHub: { type: String},
});

module.exports = mongoose.model('User', UserSchema)
