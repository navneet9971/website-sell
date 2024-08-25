const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken'); // Assuming you're verifying tokens
const Purchase = require('../../models/purchaseItemData/PurchaseItem'); 
const SellData = require('../../models/sellcodeModel/sellGetModel');

router.use(express.json());

// Setup Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);


// Create Order Route
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    // Generate unique order receipt
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_${Math.floor(Math.random() * 10000)}`, 
      payment_capture: 1, 
    };

    // Create an order with Razorpay
    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: 'Error creating Razorpay order' });
    }

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      itemId: req.body.itemId, 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Verify Payment Route
router.post('/verify-payment', verifyToken, async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, userId, productId, img, price, title } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !userId || !productId || !img) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Validate Razorpay payment signature
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    const product = await SellData.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

    // Save purchase details to the database
    const newPurchase = new Purchase({
      userId,
      productId,
      img,
      price,
      title,
      purchaseDate: new Date(),
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      productData: {
        projectCode : product.projectCode,
        livePreview : product.livePreview,
        installationGuide : product.installationGuide,
      },
    });

    await newPurchase.save();

    res.status(200).json({ message: 'Payment verified and purchase recorded successfully', paymentId: razorpayPaymentId });
  } catch (error) {
    console.error('Error verifying payment:', error); // Log detailed error
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});


module.exports = router;
