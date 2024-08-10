const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const AddCart = require('../../models/addCartModel/AddCartModel');

// Middleware to parse JSON bodies
router.use(express.json());

router.get('/user-cart', verifyToken, async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const cartItems = await AddCart.find({ user_id });

        return res.status(200).json({
            message: 'Cart items retrieved successfully',
            cartItems,
            cartCount: cartItems.length, 
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});



module.exports = router;