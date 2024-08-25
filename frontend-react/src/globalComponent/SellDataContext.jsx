import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { throttle } from 'throttle-debounce';
import axiosInstance from '../interceptor/axiosInstance';

const ProductDataContext = createContext();

export const useProductData = () => useContext(ProductDataContext);

export const ProductDataProvider = ({ children }) => {
  const userId = Cookies.get('userId');
  const [productData, setProductData] = useState([]);

  // Define the fetchProductData function
  const fetchProductData = async () => {
    console.log('Fetch function called');
    try {
      const response = await axiosInstance.get(`/api/sell`, { params: { userId } });
      console.log('Response:', response.data);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Apply throttle to the function
  const throttledFetchProductData = useCallback(
    throttle(2000, fetchProductData),
    [] // Dependencies array is empty
  );

  useEffect(() => {
    throttledFetchProductData();
  }, [throttledFetchProductData]);

  return (
    <ProductDataContext.Provider value={{ productData, fetchProductData: throttledFetchProductData, userId }}>
      {children}
    </ProductDataContext.Provider>
  );
};
