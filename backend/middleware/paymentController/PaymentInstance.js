const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken'); // Token verification middleware
const Purchase = require('../../models/purchaseItemData/PurchaseItem'); 
const SellData = require('../../models/sellcodeModel/sellGetModel');

// Setup Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Route
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { amount, currency, itemId } = req.body;

    // Validate request
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required.' });
    }

    // Generate unique order receipt
    const options = {
      amount: amount, // Razorpay expects amount in paise (1 INR = 100 paise)
      currency: currency,
      receipt: `receipt_${Math.floor(Math.random() * 10000)}`,
      payment_capture: 1, // Auto capture payment
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
      itemId: itemId, // Return itemId to frontend
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

    // Fetch product data from SellData model
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
        projectCode: product.projectCode,
        livePreview: product.livePreview,
        installationGuide: product.installationGuide,
      },
    });

    await newPurchase.save();

    res.status(200).json({
      message: 'Payment verified and purchase recorded successfully',
      paymentId: razorpayPaymentId,
      product: {
        title: product.title,
        price: product.price,
        livePreview: product.livePreview,
        installationGuide: product.installationGuide,
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router;
