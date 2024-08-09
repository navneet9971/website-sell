const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();
const SellData = require('../../models/sellcodeModel/sellGetModel');
const verifyToken = require('../../models/verifyToken/verifyToken');
const Auth = require('../../models/authModel/Auths'); 

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
router.post('/sell', verifyToken, upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'installationGuide', maxCount: 1 },
  { name: 'projectCode', maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      productTitle, codeDescription, tags, programmingLanguage, features, 
      installationInstructions, adaptationInstructions, industry, devices, 
      appUse, livePreview, videoUrl, price, chooseUpload
    } = req.body;

    // Debugging information
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const { id } = req.authData;
    const user = await Auth.findById(id);

    if (!user) {
      console.error('User not found:', id);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Handle missing files gracefully
    const { images, installationGuide, projectCode } = req.files || {};

    const parsedTags = typeof tags === 'string' ? tags.split(',') : tags;
    const parsedFeatures = typeof features === 'string' ? features.split(',') : features;
    const parsedDevices = typeof devices === 'string' ? devices.split(',') : devices;
    const parsedIndustry = typeof industry === 'string' ? industry.split(',') : industry;
    const parsedAppuse = typeof appUse === 'string' ? appUse.split(',') : appUse;

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
      appUse: parsedAppuse,
      livePreview,
      videoUrl,
      projectImages: images ? images.map(file => file.path) : [],
      price,
      projectCode: projectCode ? projectCode[0].path : null,
      installationGuide: installationGuide ? installationGuide[0].path : null,
      user: user._id,
      currentDate: new Date().toISOString(), 
      chooseUpload,
      userData: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        image: user.image,
      }
    });

    await newSellData.save();

    return res.status(200).json({ message: 'Project submitted successfully', data: newSellData });

  } catch (error) {
    console.error('Error saving sell data:', error);
    return res.status(500).json({ error: 'Server is down', details: error.message });
  }
});

module.exports = router;
