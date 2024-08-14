const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const User = require('../../models/addUserModel/UserModel');


router.get('/user-profile', verifyToken, async (req, res) => {
    try {
        const { id } = req.authData;

        // Find the user profile in the database
        const userProfile = await User.findOne({ user: id });

        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        return res.status(200).json({ message: 'User profile retrieved successfully', data: userProfile });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        return res.status(500).json({ error: 'Server is down', details: error.message });
    }
});

module.exports = router;
