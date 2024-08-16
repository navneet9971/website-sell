import React, { createContext, useReducer, useEffect, useContext, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../interceptor/axiosInstance';
import cartReducer from './countNumber/cartReducer';
import throttle from 'lodash/throttle'; // Correct import for lodash throttle

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], cartCount: 0 });
    const userId = Cookies.get("userId");

    const fetchCartCount = useCallback(
        throttle(async () => {
            if (userId) {
                try {
                    const response = await axiosInstance.get('/api/user-cart', { params: { user_id: userId } });
                    dispatch({ type: 'UPDATE_CART_COUNT', payload: response.data.cartCount || 0 });
                } catch (error) {
                    console.error('Error fetching cart count:', error);
                }
            }
        }, 2000), // Throttle to avoid frequent API calls
        [userId]
    );

    useEffect(() => {
        fetchCartCount();
    }, [fetchCartCount]);

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
