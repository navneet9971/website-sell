const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const AddCart = require('../../models/addCartModel/AddCartModel');

// Middleware to parse JSON bodies
router.use(express.json());

// Route to add a product to the cart
router.post('/add-cart', verifyToken, async (req, res) => {
    try {
        const { product_id, user_id, price, image, industry, productTitle } = req.body;

        const newAddCart = new AddCart({
            product_id,
            user_id,
            price,
            image,
            industry,
            productTitle,
        });

        await newAddCart.save();

        return res.status(200).json({
            message: 'Product added to cart successfully',
            data: newAddCart,
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});

// Route to remove a product from the cart
router.delete('/remove-cart', verifyToken, async (req, res) => {
    try {
        const { product_id, user_id } = req.body;

        const deletedCartItem = await AddCart.findOneAndDelete({ product_id, user_id });

        if (!deletedCartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        return res.status(200).json({
            message: 'Product removed from cart successfully',
            data: deletedCartItem,
        });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});

// Route to get all cart items for a user

//If any prodlen with user-cart api they will not send a cartcount then use this api
// // Route to get the count of items in the user's cart
// router.get('/cart-count', verifyToken, async (req, res) => {
//     try {
//         const { user_id } = req.query;

//         if (!user_id) {
//             return res.status(400).json({ error: 'User ID is required' });
//         }

//         // Find all cart items for the user and return the count
//         const cartCount = await AddCart.countDocuments({ user_id });

//         return res.status(200).json({
//             message: 'Cart count retrieved successfully',
//             cartCount,
//         });
//     } catch (error) {
//         console.error('Error fetching cart count:', error);
//         return res.status(500).json({ error: 'Something went wrong', details: error.message });
//     }
// });

module.exports = router;
