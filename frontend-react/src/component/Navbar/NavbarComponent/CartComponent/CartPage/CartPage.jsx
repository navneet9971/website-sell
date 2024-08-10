import { Button } from '../../../../ui/button';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { useCart } from '../../../../../globalComponent/CartContext';


const CartPage = () => {
  const userId = Cookies.get("userId");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { state, dispatch } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get('/api/user-cart', { params: { user_id: userId } });
          setCartItems(response.data.cartItems);
          console.log(response);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [userId]);

  //Total of Price
  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
    const newTax = newSubtotal * 0.1;
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newSubtotal + newTax);
  }, [cartItems]);

  //Remove Cart Item
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

  return (
    <div className='flex items-start justify-around px-6 py-8'>
      <div className='w-3/5'>
        <h1 className='font-bold text-3xl mb-6'>Shopping Cart</h1>
        <div className='flex flex-col items-start justify-start gap-7'>
          {cartItems.map(item => (
            <div key={item.product_id} className='flex items-start justify-between w-full p-4 border-b'>
              <div className='flex items-start gap-4'>
                <img
                  src={item.projectImages}
                  width={170}
                  height={170}
                  alt={item.productTitle}
                />
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-xl'>{item.productTitle}</h2>
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
        </div>

        {cartItems.length === 0 && (
          <div className='mt-8 text-center'>
            <h2 className='text-2xl font-semibold'>Your cart is empty</h2>
            <p className='text-gray-600'>Add items to your cart to see them here.</p>
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
