// src/routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/clerk-sdk-node');

router.get('/protected', requireAuth, (req, res) => {
  res.send('This is a protected route!');
});

module.exports = router;
