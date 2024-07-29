const express = require('express');
const multer = require('multer');
const router = express.Router();
const secretKey = process.env.SECRET_KEY;

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Multer file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/zip' || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// Multer upload configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to handle sell code submission
router.post('/sell', upload.fields([
    { name: 'projectImages', maxCount: 3 },
    { name: 'installationGuide', maxCount: 1 },
    { name: 'projectCode', maxCount: 1 }
]), async (req, res) => {
    try {
        const { productTitle, codeDescription, tags, programmingLanguage, features, installationInstructions, adaptationInstructions, industry, devices, livePreview, videoUrl, price } = req.body;

        // Handling file uploads
        const projectImages = req.files['projectImages'] || [];
        const installationGuide = req.files['installationGuide'] ? req.files['installationGuide'][0] : null;
        const projectCode = req.files['projectCode'] ? req.files['projectCode'][0] : null;

        if (projectImages.length < 3) {
            return res.status(400).json({ error: 'At least 3 images are required for projectImages' });
        }

        if (!installationGuide) {
            return res.status(400).json({ error: 'Installation guide PDF is required' });
        }

        if (!projectCode) {
            return res.status(400).json({ error: 'Project code ZIP file is required' });
        }

        // Handle the rest of the form submission logic
        // For example, save the details to your database

        return res.status(200).json({ message: 'Project submitted successfully' });

    } catch (error) {
        return res.status(500).json({ error: 'Server is down' });
    }
});

module.exports = router;
