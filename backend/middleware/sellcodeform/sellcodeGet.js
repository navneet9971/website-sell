const express = require('express');
const router = express.Router();

// Mock data for demonstration
const sellData = {
    productTitle: 'Sample Product',
    codeDescription: 'This is a sample code description.',
    tags: ['tag1', 'tag2'],
    programmingLanguage: 'JavaScript',
    features: ['feature1', 'feature2'],
    installationInstructions: 'Sample installation instructions.',
    adaptationInstructions: 'Sample adaptation instructions.',
    industry: 'Tech',
    devices: ['device1', 'device2'],
    livePreview: 'http://example.com/preview',
    videoUrl: 'http://example.com/video',
    projectImages: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    installationGuide: 'guide.pdf',
    projectCode: 'code.zip',
    price: 100
};

router.get('/sell', (req, res) => {
    res.status(200).json(sellData);
});

module.exports = router;
