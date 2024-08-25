const express = require('express');
const router = express.Router();
const SellData = require('../../models/sellcodeModel/sellGetModel');
const Purchase = require('../../models/purchaseItemData/PurchaseItem');

router.get('/sell', async (req, res) => {
    try {
        const { userId, productId } = req.query;

        const query = {};
        if (productId) query._id = productId; 

        // Fetch sell data based on the constructed query object
        const sellData = await SellData.find(query);

        if (!sellData || sellData.length === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }

        if (userId) {
            // Fetch purchases made by the user for the relevant product IDs
            const productIds = sellData.map(item => item._id.toString()); // Get product IDs from sellData
            const purchases = await Purchase.find({
                userId,
                productId: { $in: productIds }, // Find purchases related to the products in sellData
            });

            // Create a map for quick lookup of purchase data by productId
            const purchaseMap = new Map(purchases.map(purchase => [purchase.productId.toString(), purchase._id.toString()]));

            // Add a flag to indicate if the product has been purchased and include purchaseId
            const sellDataWithPurchaseStatus = sellData.map(data => {
                const purchased = purchaseMap.has(data._id.toString());
                return {
                    ...data.toObject(),
                    purchased, 
                    purchaseId: purchased ? purchaseMap.get(data._id.toString()) : null, 
                };
            });
            return res.status(200).json(sellDataWithPurchaseStatus);
        } else {
            return res.status(200).json(sellData);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

module.exports = router;
