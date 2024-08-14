const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    bio: { type: String, default: '' },
    city: { type: String },
    country: { type: String },
    address: { type: String },
    date_of_birth: { type: String },
    phoneNumber: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    github: { type: String }, 
    profilePic: { type: String, default: '' },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
      },
      userData: { 
        fullName: { type: String }, 
        userName: { type: String }, 
        email: { type: String },
        profilePic: { type: String, default: ''}
      }
});

module.exports = mongoose.model('User', UserSchema);