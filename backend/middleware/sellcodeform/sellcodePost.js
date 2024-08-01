const express = require('express');
const multer = require('multer');
const router = express.Router();
const SellData = require('../../models/sellcodeModel/sellGetModel');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON bodies
router.use(express.json());

// Route to handle sell code submission
router.post('/sell', upload.fields([
//   { name: 'images', maxCount: 1 },
//   { name: 'installationGuide', maxCount: 1 },
//   { name: 'projectCode', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      productTitle, codeDescription, tags, programmingLanguage, features, 
      installationInstructions, adaptationInstructions, industry, devices, 
      livePreview, videoUrl, price
    } = req.body;

    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    // Validate required fields
    if (!productTitle || !codeDescription || !programmingLanguage) {
      return res.status(400).json({ error: 'Missing required fields' });
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
      installationGuide: installationGuide ? installationGuide[0].path : null
    });

    await newSellData.save();

    return res.status(200).json({ message: 'Project submitted successfully', data: newSellData });

  } catch (error) {
    console.error('Error saving sell data:', error);
    return res.status(500).json({ error: 'Server is down', details: error.message });
  }
});

module.exports = router;
