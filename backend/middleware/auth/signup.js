const express = require('express');
const Auth = require("../../models/authModel/Auths");
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        resource_type: 'auto',
    },
});

const upload = multer({ storage });

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/signup', upload.fields([{ name: 'profilePic', maxCount: 1 }]), async (req, res) => {
    try {
        const { fullName, userName, email, password, remember } = req.body;

        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with profilePic
        const user = await Auth.create({
            fullName,
            userName,
            email,
            password,
            remember,
            profilePic: req.files && req.files.profilePic ? req.files.profilePic[0].path : '',  
        });

        // Send the created user details (excluding the password)
        res.status(201).json({
            id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            remember: user.remember,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});


module.exports = router;
