import { Button } from '../../../../ui/button';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { useCart } from '../../../../../globalComponent/CartContext';
import { useNavigate } from 'react-router-dom';
import cart from "../../../../../assets/online.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CartPage = () => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { state, dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get('/api/user-cart', { params: { user_id: userId } });
          setCartItems(response.data.cartItems);
          console.log(response);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        } finally {
          setIsLoading(false); 
        }
      }
    };

    setTimeout(fetchCartItems, 100); 
  }, [userId]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
    const newTax = newSubtotal * 0.1;
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newSubtotal + newTax);
  }, [cartItems]);

  const removeItem = async (product_id) => {
    try {
      await axiosInstance.delete('/api/remove-cart', { data: { product_id, user_id: userId } });
      setCartItems(prevItems => prevItems.filter(item => item.product_id !== product_id));
      dispatch({ type: 'UPDATE_CART_COUNT', payload: state.cartCount - 1 });
      toast.success('Item removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleCardClick = (item) => {
    navigate(`/productInfo/${item.product_id}`);
    console.log(`Card with id ${item.product_id} clicked`);
  };

  return (
    <div className='flex items-start justify-around px-6 py-8'>
      <div className='w-3/5'>
        <h1 className='font-bold text-3xl mb-6'>Shopping Cart</h1>

        {isLoading ? (
          // Loading view - temporary display before actual data
          <div className="text-center">
            <h2 className="text-lg text-gray-600">Loading your cart...</h2>
          </div>
        ) : (
          <div className='flex flex-col items-centre justify-centre gap-7'>
            {cartItems.map(item => (
              <div key={item.product_id} className='flex items-start justify-between w-full p-4 border-b'>
                <div className='flex items-start gap-4'>
                  <LazyLoadImage
                    src={item.projectImages}
                    width={170}
                    height={100}
                    alt={item.productTitle}
                    effect="blur"
                  />
                  <div className='flex flex-col'>
                    <h2 
                      className='font-semibold text-xl cursor-pointer hover:text-blue-500'
                      onClick={() => handleCardClick(item)}
                    >
                      {item.productTitle}
                    </h2>
                    <p className='text-gray-600'>{item.industry}</p>
                    <p className='font-bold text-lg'>&#8377; {item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product_id)}
                  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                  Remove
                </button>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className='flex flex-col items-center justify-center mt-8'>
                <LazyLoadImage
                  src={cart}
                  width={160}
                  height={115}
                  effect="blur"
                />
                <h2 className='text-2xl font-semibold'>Your cart is empty</h2>
                <p className='text-gray-600'>Add items to your cart to see them here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='w-1/4 h-full'>
        <h1 className='text-2xl font-bold mb-4'>Order Summary</h1>
        <div className='w-full h-full bg-gray-100 p-4 rounded-lg'>
          <div className='flex items-center justify-between mb-4 border-b'>
            <h2 className='text-gray-700'>Subtotal</h2>
            <p className='text-gray-700'>&#8377; {subtotal.toFixed(2)}</p>
          </div>

          <div className='flex items-center justify-between mb-4 border-b'>
            <h2 className='text-gray-700'>Tax</h2>
            <p className='text-gray-700'>&#8377; {tax.toFixed(2)}</p>
          </div>

          <div className='flex items-center justify-between mb-5 mt-7'>
            <h2 className='text-gray-900 font-bold'>Order Total</h2>
            <p className='text-gray-900 font-bold'>&#8377; {total.toFixed(2)}</p>
          </div>

          <Button variant='outline' className='w-full font-bold text-lg'>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
