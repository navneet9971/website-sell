const express = require('express');
const router = express.Router();
const SellData = require('../../models/sellcodeModel/sellGetModel');

// GET API to retrieve data from MongoDB
router.get('/sell', async (req, res) => {
    try {
        const sellData = await SellData.find();
        res.status(200).json(sellData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;