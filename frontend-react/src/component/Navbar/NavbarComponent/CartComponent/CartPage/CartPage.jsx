import { Button } from '../../../../ui/button';
import { CategoriesData } from '../../../../../data/data';

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CartPage = () => {
  const [cartItems, setCartItems] = useState(CategoriesData)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0)
    const newTax = newSubtotal * 0.1 
    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newSubtotal + newTax)
  }, [cartItems])

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    toast.success('Item removed from cart!')
  }

  return (
    <div className='flex items-start justify-around px-6 py-8'>
      <div className='w-3/5'>
     
        <h1 className='font-bold text-3xl mb-6'>Shopping Cart</h1>

        <div className='flex flex-col items-start justify-start gap-7'>
          {cartItems.map(item => (
            <div key={item.id} className='flex items-start justify-between w-full p-4 border-b'>
              <div className='flex items-start gap-4'>
                <img
                  src={item.img}
                  width={170}
                  height={170}
                  alt={item.title}
                />
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-xl'>{item.title}</h2>
                  <p className='text-gray-600'>{item.industry}</p>
                  <p className='font-bold text-lg'>${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
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
        <div className='w-full h-full bg-gray-100 p-4 rounded-lg '>
          <div className='flex items-center justify-between mb-4 border-b'>
            <h2 className='text-gray-700'>Subtotal</h2>
            <p className='text-gray-700'>${subtotal.toFixed(2)}</p>
          </div>

          <div className='flex items-center justify-between mb-4 border-b'>
            <h2 className='text-gray-700'>Tax</h2>
            <p className='text-gray-700'>${tax.toFixed(2)}</p>
          </div>

          <div className='flex items-center justify-between mb-5 mt-7'>
            <h2 className='text-gray-900 font-bold'>Order Total</h2>
            <p className='text-gray-900 font-bold'>${total.toFixed(2)}</p>
          </div>

          <Button variant='outline' className='w-full font-bold text-lg'>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
