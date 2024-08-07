const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const SellData = require('../../models/sellcodeModel/sellGetModel');
const User = require('../../models/userModel/user');
// const clerkMiddleware = require('../authenticateJWT/clerkConfig');

const router = express.Router();

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
    allowedFormats: ['jpg', 'jpeg', 'png', 'pdf', 'zip'],
    resource_type: 'auto',
  },
});

const upload = multer({ storage });

// Middleware to parse JSON bodies
router.use(express.json());

// Route to handle sell code submission
router.post('/sell', upload.fields([
  { name: 'images', maxCount: 1 },
  { name: 'installationGuide', maxCount: 1 },
  { name: 'projectCode', maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      productTitle, codeDescription, tags, programmingLanguage, features, 
      installationInstructions, adaptationInstructions, industry, devices, 
      livePreview, videoUrl, price
    } = req.body;

    const userId = req.auth.userId; // Ensure `userId` is set by clerkMiddleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { images, installationGuide, projectCode } = req.files;

    const parsedTags = typeof tags === 'string' ? tags.split(',') : tags;
    const parsedFeatures = typeof features === 'string' ? features.split(',') : features;
    const parsedDevices = typeof devices === 'string' ? devices.split(',') : devices;
    const parsedIndustry = typeof industry === 'string' ? industry.split(',') : industry;

    const newSellData = new SellData({
      productTitle,
      codeDescription,
      tags: parsedTags,
      programmingLanguage,
      features: parsedFeatures,
      installationInstructions,
      adaptationInstructions,
      industry: parsedIndustry,
      devices: parsedDevices,
      livePreview,
      videoUrl,
      projectImages: images ? images[0].path : null,
      price,
      projectCode: projectCode ? projectCode[0].path : null,
      installationGuide: installationGuide ? installationGuide[0].path : null,
      user: user._id,
    });

    await newSellData.save();

    return res.status(200).json({ message: 'Project submitted successfully', data: newSellData });

  } catch (error) {
    console.error('Error saving sell data:', error);
    return res.status(500).json({ error: 'Server is down', details: error.message });
  }
});

module.exports = router;
