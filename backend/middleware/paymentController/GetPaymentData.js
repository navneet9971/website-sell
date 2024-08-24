const express = require('express');
const router = express.Router();
const Purchase = require('../../models/purchaseItemData/PurchaseItem');
const verifyToken = require('../../models/verifyToken/verifyToken');
const Auth = require('../../models/authModel/Auths');


// Route to fetch all purchases for a specific user
router.get('/user-purchases/:userId', verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from route params

    // Check if userId is available
   // Validate user authentication
   const { id } = req.authData;
   const user = await Auth.findById(id);

   if (!user) {
     console.error('User not found:', id);
     return res.status(401).json({ error: 'Unauthorized' });
   }

    // Fetch all purchases for the user
    const purchases = await Purchase.find({ userId }).populate('_id'); // Ensure `productId` is populated

    if (!purchases.length) {
      return res.status(404).json({ message: 'No purchases found for this user' });
    }

    // Return the user's purchase history
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching user purchases:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router;
