const express = require('express');
// Use promises API for async file operations
const fs = require('fs').promises; 
const path = require('path');

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

module.exports = router;
