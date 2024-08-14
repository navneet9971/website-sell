const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const verifyToken = require('../../models/verifyToken/verifyToken');
const User = require('../../models/addUserModel/UserModel');
const Auth = require('../../models/authModel/Auths')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        resource_type: 'auto',
    },
});

const upload = multer({ storage });

router.use(express.json());

router.put('/user-profile', verifyToken, upload.fields([{ name: 'profilePic', maxCount: 1 }]), async (req, res) => {
    try {
        const {
            bio, 
            city, 
            country, 
            address, 
            date_of_birth, 
            phoneNumber, 
            twitter, 
            facebook, 
            linkedin, 
            github,
        } = req.body;

        const { id } = req.authData; // Assuming id is the user's id from the Auth model
        const profilePic = req.files && req.files['profilePic'] ? req.files['profilePic'][0].path : null;

        // Update User model
        let user = await User.findOne({ user: id });
        
        if (!user) {
            user = new User({
                bio,
                city,
                country,
                address,
                date_of_birth,
                phoneNumber,
                twitter,
                facebook,
                linkedin,
                github,
                user: id,
                profilePic,
            });
        } else {
            user.bio = bio ?? user.bio;
            user.city = city ?? user.city;
            user.country = country ?? user.country;
            user.address = address ?? user.address;
            user.date_of_birth = date_of_birth ?? user.date_of_birth;
            user.phoneNumber = phoneNumber ?? user.phoneNumber;
            user.twitter = twitter ?? user.twitter;
            user.facebook = facebook ?? user.facebook;
            user.linkedin = linkedin ?? user.linkedin;
            user.github = github ?? user.github;
            user.profilePic = profilePic ?? user.profilePic;
            // Update userData.profilePic if it exists
            if (user.userData) {
                user.userData.profilePic = profilePic ?? user.userData.profilePic;
            }
        }

        await user.save();

        // Update profilePic in Auth model
        if (profilePic) {
            await Auth.findByIdAndUpdate(id, { profilePic });
        }

        res.status(200).json({ message: user ? 'Profile updated successfully' : 'Profile created successfully', user });
    } catch (error) {
        console.error('Error handling profile:', error);
        res.status(500).json({ error: 'An error occurred while handling the profile', details: error.message });
    }
});



module.exports = router;
