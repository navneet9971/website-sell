const express = require('express');
const Auth = require("../../models/authModel/Auths");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const secretKey = process.env.SECRET_KEY;

router.post('/login', async (req, res) => {
    const { email, password, remember } = req.body;

    try {
        if (!email || !password) {
            console.log('Email or password not provided');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await Auth.findOne({ email });
        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Invalid password for user: ${email}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token with expiry based on remember me flag
        const tokenExpiry = remember ? '7d' : '1d';  
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: tokenExpiry });
        
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
