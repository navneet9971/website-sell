import React, { createContext, useReducer, useEffect, useContext,  useMemo } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../interceptor/axiosInstance';
import likeReducer from './countNumber/likeReducer';
import throttle from 'lodash.throttle';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(likeReducer, { like: [], likeCount: 0 });
    const userId = Cookies.get("userId");

    // Create a stable throttled function using useMemo
    const throttledFetchLikeCount = useMemo(() => 
        throttle(async () => {
            if (userId) {
                try {
                    const response = await axiosInstance.get('/api/user-like', { params: { user_id: userId } });
                    console.log('API response:', response.data);
                    dispatch({ type: 'LOAD_LIKE', payload: response.data.data });
                } catch (error) {
                    console.error('Error fetching like count:', error);
                }
            }
        }, 1000),
    [userId]); 

    useEffect(() => {
        throttledFetchLikeCount();
     
        return () => {
            throttledFetchLikeCount.cancel();
        };
    }, [throttledFetchLikeCount]);

    return (
        <LikeContext.Provider value={{ state, dispatch }}>
            {children}
        </LikeContext.Provider>
    );
}

export const useLike = () => useContext(LikeContext);
