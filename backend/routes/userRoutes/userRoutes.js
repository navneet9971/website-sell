const express = require('express');
const router = express.Router();
const User = require('../../models/userModel/user');
const { requireAuth, getSession } = require('@clerk/clerk-sdk-node');

// Get user info (requires authentication)
router.get('/user', requireAuth, async (req, res) => {
  try {
    console.log('Auth Header:', req.headers.authorization); 
    console.log('User ID:', req.auth.userId); 

    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.auth.userId;
    const user = await User.findOne({ clerkId: userId });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



// Create or update user info
router.post('/user', requireAuth, async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.auth.userId;
    const { email } = req.body;

    let user = await User.findOne({ clerkId: userId });

    if (user) {
      user.email = email;
      await user.save();
    } else {
      user = new User({ clerkId: userId, email });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
