const express = require('express');
const Auth = require("../../models/authModel/Auths");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
    try {
        const { fullName, userName, email, password, remember } = req.body;

        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const user = await Auth.create({ fullName, userName, email, password, remember });

        // Send the created user details (excluding the password)
        res.status(201).json({
            id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            remember: user.remember
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

module.exports = router;
