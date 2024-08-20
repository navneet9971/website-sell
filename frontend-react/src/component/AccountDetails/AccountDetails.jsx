import React, { useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { AccountDetailsPage } from './AccountDetailsPage';

const RazorpayPayment = () => {
  const [amount, setAmount] = useState('');

  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_PHGAUJrRKLsGa4"; // Put your actual Razorpay key ID or get it from env

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    try {
      // Create order by calling the server endpoint
      const { data: order } = await axiosInstance.post('/api/create-order', {
        amount: amount, // Razorpay takes amount in rupey
        currency: 'INR',
        receipt: `receipt#${Math.floor(Math.random() * 10000)}`, // Generate unique receipt
      });

    
      const options = {
        key: key_id, // Razorpay key_id
        amount: order.amount, // Amount is in paise
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created on the backend
        handler: function (response) {
          // Verify payment after successful completion
          axiosInstance.post('/api/verify-payment', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            itemId: order.itemId, // Include itemId or product details if necessary
          }).then(res => {
            alert('Payment Success!');
            // Redirect to success page or update the UI
          }).catch(err => {
            console.error('Payment Verification Error', err);
            alert('Payment verification failed');
          });
        },
        prefill: {
          name: 'John Doe', // Pre-fill customer details
          email: 'john.doe@example.com',
          contact: '9876543210'
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Something went wrong while creating the order');
    }
  };

  return (
    <div>
      {/* <h1>Razorpay Payment Gateway Integration</h1>
      <form id="payment-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="button" onClick={payNow}>
          Pay Now
        </button>
      </form> */}

      <AccountDetailsPage />
    </div>
  );
};

export default RazorpayPayment;
