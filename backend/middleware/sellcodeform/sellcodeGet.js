const express = require('express');
const SellData = require('../../models/sellcodeModel/sellGetModel');

const router = express.Router();

// GET API to retrieve data from MongoDB
router.get('/sell', async (req, res) => {
    try {
        const { userId, productId } = req.query;
        
        // Build query object based on provided parameters
        const query = {};
        if (userId) query.user = userId;
        if (productId) query._id = productId;
 
        // Fetch data based on the constructed query object
        const sellData = await SellData.find(query);

        res.status(200).json(sellData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
