const express = require('express');
const router = express.Router();
const Auth = require('../../models/authModel/Auths');
const verifyToken = require('../../models/verifyToken/verifyToken');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const User = require('../../models/addUserModel/UserModel');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

router.use(express.json());

router.post('/user-profile', verifyToken, upload.fields([{ name: 'profilePic', maxCount: 1}]), async (req, res ) => {
    try{
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
        
        const { id } = req.authData;
        const user = await Auth.findById(id);

        if (!user) {
            console.error('User not found:', id);
            return res.status(401).json({ error: 'Unauthorized' });
          }

          const { profilePic } = req.files || {};

      const existingUser = new User({
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
        profilePic: profilePic? profilePic[0].path : null,
        user: user._id,
        userData: {
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            profilePic: user.profilePic,
        }
      })

      await existingUser.save();

      return res.status(200).json({ message: 'User Data Update Success',data: existingUser });

    }catch (error) {
        console.error('Error saving sell data:', error);
        return res.status(500).json({ error: 'Server is down', details: error.message });
      }
});

module.exports = router;