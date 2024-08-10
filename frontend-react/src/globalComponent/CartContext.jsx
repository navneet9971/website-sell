import React, { createContext, useReducer, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../interceptor/axiosInstance';
import cartReducer from './countNumber/cartReducer';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], cartCount: 0 });
    const userId = Cookies.get("userId");

    useEffect(() => {
        const fetchCartCount = async () => {
            if (userId) {
                try {
                    const response = await axiosInstance.get('/api/user-cart', { params: { user_id: userId } });
                    dispatch({ type: 'UPDATE_CART_COUNT', payload: response.data.cartCount || 0 });
                } catch (error) {
                    console.error('Error fetching cart count:', error);
                }
            }
        };

        fetchCartCount();
    }, [userId]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
