import React from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const RazorpayPayment = ({
 price, title, description, img, onSuccess, productId, userId
}) => {
  // const location = useLocation();
  // const {} = location.state || {}; // Destructuring location.state

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
    if (!price) {
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
        amount: price * 100, // Razorpay expects the amount in paise (INR = * 100)
        currency: 'INR',
        receipt: `receipt#${Math.floor(Math.random() * 10000)}`,
        itemId: productId, // Attach the product ID for the order
      });
  
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: title,
        description: 'Payment for Code Purchase',
        order_id: order.id,
        handler: async function (response) {
          try {
            const res = await axiosInstance.post('/api/verify-payment', {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userId: userId,
              productId: productId,
              img: img,
              price: price, // Ensure price is sent
              title: title, // Ensure title is sent
            });
            toast.success('Payment is Done');
            if (onSuccess) {
              onSuccess(res);
            }
          } catch (err) {
            toast.error('Payment verification failed');
            console.error('Payment Verification Error', err.response ? err.response.data : err.message);
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
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
    <button
    onClick={payNow}
    className="bg-blue-500 text-white font-bold text-xl px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
  >
    Confirm Payment
  </button>
  );
};

export default RazorpayPayment;
