const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const AddLike = require('../../models/addLikeModel/AddLikeModel');

router.use(express.json());

router.post('/add-like', verifyToken, async ( req, res ) => {
    try{
        const { product_id, user_id, price, productTitle, projectImages, codeDescription, likeStatus } = req.body;
    
        const newAddLike = new AddLike ({
            product_id,
            user_id,
            price,
            productTitle,
            projectImages,
            codeDescription,
            likeStatus
        });

        await newAddLike.save();

        return res.status(200).json({
            message: 'Like added successfully',
            data: newAddLike,
        });
    } catch(error) {
        console.error('Error saving like:', error);
        return res.status(500).json({
            error: 'Something went wrong',
            details: error.message,
        });
    }
});

//Route to remove a product from the Like

router.delete('/remove-like', verifyToken, async (req, res) => {
    try{
        const { product_id, user_id } = req.body;
        const deletedLikeItem = await AddLike.findOneAndDelete({ product_id, user_id });
    
    if(!deletedLikeItem) {
        return res.status(404).json({ error: 'Like item not found'})
    }
    
    return res.status(200).json({
        message: 'Product removed from Like successfully',
        data: deletedLikeItem,
    });
    } catch (error){
        console.error('Error deleting like:', error);
        return res.status(500).json({
            error: 'Error removing product from Like',
            details: error.message,
        });
    }
})

module.exports = router;
