const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const SellerPaymentDetails = require('../../models/saveBankDetails/UserBankDetails');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,      
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

// Handle payment success and initiate payout
router.post('/success', async (req, res) => {
  const { paymentId, sellerId, amount } = req.body;

  try {
    // Fetch seller's bank details from your database
    const seller = await SellerPaymentDetails.findOne({ sellerId });

    if (!seller) {
      return res.status(400).json({ error: 'Seller bank details not found' });
    }

    // Create a Razorpay contact for the seller
    const contact = await razorpay.contacts.create({
      name: seller.name, 
      email: seller.email, 
      contact: seller.contact, 
      type: 'vendor',
    });

    // Create a fund account using the seller's bank details
    const fundAccount = await razorpay.fundAccount.create({
      contact_id: contact.id,
      account_type: 'bank_account',
      bank_account: {
        name: seller.name, 
        ifsc: seller.ifscCode, 
        account_number: seller.accountNumber,
      },
    });

    // Initiate the payout to the seller's bank account
    const payout = await razorpay.payouts.create({
      fund_account_id: fundAccount.id, // Use the seller's fund account ID
      amount: amount * 100, // Amount in paise (multiply by 100 to convert to INR)
      currency: 'INR', // Currency
      mode: 'IMPS', // Payment mode: 'IMPS', 'NEFT', 'RTGS', or 'UPI'
      purpose: 'vendor_payment', // The purpose of the payout
      queue_if_low_balance: true, // Whether to queue if balance is low
    });

    // Send success response if payout is initiated
    res.json({ success: true, payout });
  } catch (error) {
    console.error('Error during payout process:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

module.exports = router;
