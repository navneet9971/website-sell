const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../../sell-code-firebase-adminsdk-r3ih9-109458c447.json');
const router = express.Router();
const SellData = require('../../models/sellcodeModel/sellGetModel');
const verifyToken = require('../../models/verifyToken/verifyToken');
const Auth = require('../../models/authModel/Auths');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sell-code.appspot.com',
});

const bucket = admin.storage().bucket();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Validate user authentication
    const { id } = req.authData;
    const user = await Auth.findById(id);

    if (!user) {
      console.error('User not found:', id);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { images = [], installationGuide = [], projectCode = [] } = req.files || {};

    // Upload files to Firebase Storage
    const uploadedFiles = await Promise.all(
      [...images, ...installationGuide, ...projectCode].map(async file => {
        const fileName = `${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        await fileUpload.save(file.buffer, {
          contentType: file.mimetype,
          public: true,
        });

        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        return fileUrl;
      })
    );

    const [imageUrls, installationGuideUrl, projectCodeUrl] = [
      uploadedFiles.slice(0, images.length),
      uploadedFiles[images.length] || null,
      uploadedFiles[images.length + 1] || null,
    ];

    const parsedTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
    const parsedFeatures = typeof features === 'string' ? features.split(',').map(feature => feature.trim()) : features;
    const parsedDevices = typeof devices === 'string' ? devices.split(',').map(device => device.trim()) : devices;
    const parsedIndustry = typeof industry === 'string' ? industry.split(',').map(industry => industry.trim()) : industry;
    const parsedAppuse = typeof appUse === 'string' ? appUse.split(',').map(app => app.trim()) : appUse;

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
      projectImages: imageUrls,
      price,
      projectCode: projectCodeUrl,
      installationGuide: installationGuideUrl,
      user: user._id,
      currentDate: new Date().toISOString(), 
      chooseUpload,
      userData: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        image: user.profilePic,
      }
    });

    await newSellData.save();

    return res.status(200).json({ message: 'Project submitted successfully', data: newSellData });

  } catch (error) {
    console.error('Error saving sell data:', error);
    if (error.message.includes('File too large')) {
      return res.status(400).json({ error: 'File size exceeds limit' });
    }
    return res.status(500).json({ error: 'Server is down', details: error.message });
  }
});

module.exports = router;
