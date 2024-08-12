const express = require('express');
const router = express.Router();
const UserReview = require('../../models/userReview/UserReview');
const Auth = require('../../models/authModel/Auths');
const timeAgo = require('../../utlity/timeAgo');

// Get Reviews with Overall Rating and Time Ago
router.get('/review-get', async (req, res) => {
    try {
        const { productId, userId } = req.query;

        // Build query to fetch reviews based on productId and userId
        const query = {};
        if (productId) query.product_id = productId; // Assuming productId is a field in UserReview
        if (userId) query.user = userId;

        console.log('Query:', query);  // Debugging line

        // Fetch reviews
        const reviews = await UserReview.find(query);

        // Get user IDs from reviews
        const userIds = [...new Set(reviews.map(review => review.user))]; // Ensure unique user IDs

        // Fetch user details
        const users = await Auth.find({ _id: { $in: userIds } }).select('fullName email');

        // Create a map of user details for quick lookup
        const userMap = users.reduce((map, user) => {
            map[user._id] = { fullName: user.fullName, email: user.email };
            return map;
        }, {});

        // Attach user details and time ago to each review
        const reviewsWithUserDetails = reviews.map(review => ({
            ...review.toObject(),
            user: userMap[review.user] || {},
            timeAgo: timeAgo(review.createdAt),
        }));

        // Calculate overall rating
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const overallRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : 0;

        res.status(200).json({
            reviews: reviewsWithUserDetails,
            overallRating,
            totalReviews,
        });

    } catch (err) {
        console.error('Error fetching reviews:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
    }
});

module.exports = router;
