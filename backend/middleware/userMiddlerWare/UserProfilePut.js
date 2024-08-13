const express = require('express');
const router = express.Router();
const Auth = require('../../models/authModel/Auths'); // Fixed typo: AUth -> Auth
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'png', 'jpeg']
    },
});

const upload = multer({ storage }); // Fixed typo: mullter -> multer

router.use(express.json());

router.put('/user-profile', upload.fields([{ name: 'profilePic', maxCount: 1 }]), async (req, res) => {
    try {
        const {
            bio, email, 
            city, state, 
            address, date_of_birth, 
            phoneNumber, twitter, 
            facebook, linkedin, 
            github
        } = req.body;

        // Find the existing user by email
        const existingUser = await Auth.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details
        existingUser.bio = bio || existingUser.bio;
        existingUser.city = city || existingUser.city;
        existingUser.state = state || existingUser.state;
        existingUser.address = address || existingUser.address;
        existingUser.date_of_birth = date_of_birth || existingUser.date_of_birth;
        existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
        existingUser.twitter = twitter || existingUser.twitter;
        existingUser.facebook = facebook || existingUser.facebook;
        existingUser.linkedin = linkedin || existingUser.linkedin;
        existingUser.github = github || existingUser.github;

        // Update the profile picture if it was uploaded
        if (req.files && req.files.profilePic && req.files.profilePic[0]) {
            const profilePicUrl = req.files.profilePic[0].path;
            existingUser.profilePic = profilePicUrl;
        }

        // Save the updated user
        await existingUser.save();

        // Respond with the updated user details
        res.status(200).json({ message: 'Profile updated successfully', user: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
