import React from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { useLocation } from 'react-router-dom';

const RazorpayPayment = () => {
  const location = useLocation();
  const { userId, Data, productId, img, title } = location.state || {}; // Destructuring location.state

  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_PHGAUJrRKLsGa4";

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
    if (!Data) {
      alert('Price not available');
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
        amount: Data * 100, // Razorpay expects the amount in paise (INR = * 100)
        currency: 'INR',
        receipt: `receipt#${Math.floor(Math.random() * 10000)}`,
        itemId: productId, // Attach the product ID for the order
      });

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: title, // Product title
        description: 'Payment for Code Purchase',
        order_id: order.id, // Order ID from the backend
        handler: function (response) {
          // Verify payment after successful completion
          axiosInstance.post('/api/verify-payment', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: userId, // Pass userId and other necessary data
            productId: productId,
            img: img,
          })
          .then(res => {
            alert('Payment Success!');
            // Redirect to success page or update the UI
          })
          .catch(err => {
            console.error('Payment Verification Error', err);
            alert('Payment verification failed');
          });
        },
        prefill: {
          name: 'John Doe', // Prefill can be dynamic too
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
      <h1>{title}</h1>
      <img src={img} alt={title} style={{ width: '200px', height: '200px' }} />
      <p>Price: ₹{Data}</p>
      <button onClick={payNow} style={{ padding: '10px 20px', backgroundColor: '#F37254', color: 'white', border: 'none', borderRadius: '5px' }}>
        Buy Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
