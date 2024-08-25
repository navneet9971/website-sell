const express = require('express');
const Auth = require('../../models/authModel/Auths');
// const Purchase = require('../../models/purchaseItemData/PurchaseItem'); // Import Purchase model
const jwt = require('jsonwebtoken');
const router = express.Router();
const secretKey = process.env.SECRET_KEY;
const verifyToken = require('../../models/verifyToken/verifyToken');

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const authData = jwt.verify(req.token, secretKey);
        const user = await Auth.findById(authData.id)
            .select('fullName email profilePic userName');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch purchases for the user
        // const purchases = await Purchase.find({ userId: authData.id });

        res.json({
            message: 'Profile access granted',
            user,
            // purchases // Include purchases in the response
        });
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(403).json({ error: 'Invalid token' });
    }
});

module.exports = router;
