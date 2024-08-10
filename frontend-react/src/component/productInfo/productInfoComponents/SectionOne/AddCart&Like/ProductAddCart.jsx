import React, { useState, useEffect } from 'react';
import { BsFillCartCheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { FaCartPlus } from "react-icons/fa6";
import { Button } from '../../../../ui/button';
import axiosInstance from "../../../../../interceptor/axiosInstance";
import { useCart } from '../../../../../globalComponent/CartContext';

const ProductAddCart = ({ productInfo, userId }) => {
    const { state, dispatch } = useCart();
    const [cartItems, setCartItems] = useState([]);

    const id = productInfo._id;

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userId) {
                try {
                    const response = await axiosInstance.get('/api/user-cart', { params: { user_id: userId } });
                    const userCartItems = response.data.cartItems.map(item => item.product_id);
                    setCartItems(userCartItems);
                    dispatch({ type: 'UPDATE_CART_COUNT', payload: response.data.cartCount || 0 });
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [userId, dispatch]);


    const handleAddCart = async () => {
        if (!userId) {
            toast.error('Please login first!');
            return;
        }
        try {
            if (cartItems.includes(id)) {
                // Remove from cart
                await axiosInstance.delete('/api/remove-cart', { data: { product_id: id, user_id: userId } });
                setCartItems(prevItems => prevItems.filter(item => item !== id));
                dispatch({ type: 'UPDATE_CART_COUNT', payload: state.cartCount - 1 });
                toast.error('Item removed from cart!');
            } else {
                // Add to cart
                await axiosInstance.post('/api/add-cart', { product_id: id, user_id: userId });
                setCartItems(prevItems => [...prevItems, id]);
                dispatch({ type: 'UPDATE_CART_COUNT', payload: state.cartCount + 1 });
                toast.success('Item added to cart!');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            toast.error('An error occurred while updating the cart.');
        }
    };

    return (
        <Button onClick={handleAddCart} variant="outline"
            className={`flex items-center gap-2 ${cartItems.includes(id) ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
            {cartItems.includes(id) ? <BsFillCartCheckFill /> : <FaCartPlus />}
            {cartItems.includes(id) ? 'Added' : 'Add to cart'}
        </Button>
    );
};

export default ProductAddCart;
