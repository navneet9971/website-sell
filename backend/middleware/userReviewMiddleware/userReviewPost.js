const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const UserReview = require('../../models/userReview/UserReview');
const Auth = require('../../models/authModel/Auths');

router.use(express.json());

router.post('/user-review', verifyToken, async( req, res ) => {
    try {
        const { id } = req.authData;
        const user = await Auth.findById(id);
    
        if (!user) {
          console.error('User not found:', id);
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const {  comment, rating, product_id,createdAt } = req.body;

        const newReview = new UserReview({
            user: user, 
            comment,
            rating,
            product_id,
            createdAt
        });

        await newReview.save()
        return res.status(200).json({
            message: 'Review submitted successfully',
            data: newReview
        })
    } catch(error) {
        console.error('Error saving review:', error);
        return res.status(500).json({
            error: 'Server is down',
            details: error.message
        })
    }
});

//Create Review Update Api

router.put('/review-update', verifyToken , async ( req, res ) => {
    try {   
    const { id } = req.params;
        const { comment, rating } = req.body;


        const updatedReview  = await Review.findByIdAndUpdate(
            id,
            { comment, rating, updatedAt: Date.now() },
            { new: true }
        )

        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(updatedReview);
    }catch (err) {
        res.status(500).json({ error: 'Failed to update review' });
    }
})

module.exports = router;