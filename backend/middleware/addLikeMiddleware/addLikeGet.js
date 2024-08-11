const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const AddLike = require('../../models/addLikeModel/AddLikeModel');

router.use(express.json());

router.get('/user-like', verifyToken, async (req, res) => {
    try{
        const { user_id } = req.query;

        if(!user_id) {
            return res.status(400).json({error: 'User ID is required'})
        }

        const likeItems = await AddLike.find({ user_id });

        return res.status(200).json({
            success: true,
            data: likeItems,
            likeCount: likeItems.length,
        });
    } catch (error) {
        console.error('Error fetching user likes:', error);
        return res.status(500).json({ error: 'Error fetching like item', details: error.message });
    }
})

module.exports = router;