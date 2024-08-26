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
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      userId,
      productId,
      productIds,
      products,
      img,
      price,
      title,
    } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !userId || (!productId && !productIds && !products)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate Razorpay payment signature
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    let purchaseData = {
      userId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      img: Array.isArray(img) ? img : [],
      price,
      title: Array.isArray(title) ? title : [],
      purchaseDate: new Date(),
      productId: null,
      productIds: Array.isArray(productIds) ? productIds : [],
      products: [],
    };

    // Handle single product purchase
    if (productId) {
      const product = await SellData.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
    
      purchaseData.productId = productId;
      purchaseData.products.push({
        productId: product._id,
        projectCode: product.projectCode,
        livePreview: product.livePreview,
        installationGuide: product.installationGuide,
        img: Array.isArray(product.projectImages) ? product.projectImages : [],
        price: product.price,
        title: Array.isArray(product.productTitle) ? product.productTitle : [],
      });
    }
    

    // Handle multiple product purchases
    if (productIds && productIds.length > 0) {
      const products = await SellData.find({ _id: { $in: productIds } });
      if (products.length === 0) {
        return res.status(404).json({ error: 'No products found' });
      }
    
      purchaseData.productIds = productIds;
      purchaseData.products = products.map(product => ({
        productId: product._id,
        projectCode: product.projectCode,
        livePreview: product.livePreview,
        installationGuide: product.installationGuide,
        img: Array.isArray(product.projectImages) ? product.projectImages : [],
        price: product.price,
        title: Array.isArray(product.productTitle) ? product.productTitle : [],
      }));
    }
    

    // Handle detailed product information
    if (products && products.length > 0) {
      purchaseData.products = products.map(product => ({
        productId: product.productId,
        projectCode: product.projectCode,
        livePreview: product.livePreview,
        installationGuide: product.installationGuide,
        img: Array.isArray(product.img) ? product.img : [],
        price: product.price,
        title: Array.isArray(product.title) ? product.title : [],
      }));
    }
    
    // Save purchase details to the database
    const newPurchase = new Purchase(purchaseData);
    await newPurchase.save();

    res.status(200).json({
      message: 'Payment verified and purchase recorded successfully',
      paymentId: razorpayPaymentId,
      products: purchaseData.products,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router;
