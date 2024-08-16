const express = require('express');
// Use promises API for async file operations
const fs = require('fs').promises; 
const path = require('path');
const codeTypes = require('../../data/UploadType');
const industries = require('../../data/industryData');
const devices = require('../../data/DevicesData');

const router = express.Router();

router.get('/languages', async (req, res) => {
  const filePath = path.join(__dirname, '../../', 'data', 'languages.json'); // Adjust path as needed
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    res.status(500).send('Error reading data file.');
  }
});


// GET API to retrieve the types of code
router.get('/code-types', (req, res) => {
    res.json(codeTypes);
});

router.get('/industries', (req, res) => {
    res.json(industries);
  });

  router.get('/devices', (req, res) => {
    res.json(devices);
  });



module.exports = router;
