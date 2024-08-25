const express = require('express');
const router = express.Router();
const SellData = require('../../models/sellcodeModel/sellGetModel');
const Purchase = require('../../models/purchaseItemData/PurchaseItem');

router.get('/sell', async (req, res) => {
    try {
        let { userId, productId } = req.query;

        // Convert "undefined" or "null" strings to actual null values
        if (userId === 'undefined' || userId === 'null') userId = null;
        if (productId === 'undefined' || productId === 'null') productId = null;

        const query = {};
        if (productId) query._id = productId;

        // Fetch products based on query
        const sellData = await SellData.find(query);
        if (!sellData || sellData.length === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }

        // If no userId is provided, return products without purchase information
        if (!userId) {
            const sellDataWithNoUserId = sellData.map(data => ({
                ...data.toObject(),
                purchased: false, // Mark purchased as false when user is not logged in
                purchaseId: null  // No purchaseId if user is not logged in
            }));

            if (productId) {
                const specificProduct = sellDataWithNoUserId.find(item => item._id.toString() === productId);
                if (!specificProduct) {
                    return res.status(404).json({ message: 'Product not found.' });
                }
                return res.status(200).json(specificProduct);
            }

            return res.status(200).json(sellDataWithNoUserId);
        }

        // If userId is provided, check for purchases
        const productIds = sellData.map(item => item._id.toString());
        const purchases = await Purchase.find({
            userId,
            productId: { $in: productIds },
        });

        // Map purchase data by productId
        const purchaseMap = new Map(purchases.map(purchase => [purchase.productId.toString(), purchase._id.toString()]));

        const sellDataWithPurchaseStatus = sellData.map(data => {
            const purchased = purchaseMap.has(data._id.toString());
            return {
                ...data.toObject(),
                purchased,  // true or false based on purchaseMap
                purchaseId: purchased ? purchaseMap.get(data._id.toString()) : null,
            };
        });

        // If productId is provided, return that specific product
        if (productId) {
            const specificProduct = sellDataWithPurchaseStatus.find(item => item._id.toString() === productId);
            if (!specificProduct) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            return res.status(200).json(specificProduct);
        }

        return res.status(200).json(sellDataWithPurchaseStatus);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

module.exports = router;
