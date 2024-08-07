const express = require('express');
const SellData = require('../../models/sellcodeModel/sellGetModel');

const router = express.Router();

// GET API to retrieve data from MongoDB
router.get('/sell',  async (req, res) => {
    try {
        const userId = req.userId;

        const sellData = await SellData.find({ user: userId });

        res.status(200).json(sellData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
