import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Categories } from '../HomePage/Categories';
import TrendingCodesPage from '../HomePage/TrendingCodesPage';
import Cookies from 'js-cookie';
import axiosInstance from '../../interceptor/axiosInstance';
import throttle from 'lodash/throttle'; // Correct import

const ExplorePage = () => {
  const userId = Cookies.get('userId');
  const [productData, setProductData] = useState([]);

  const fetchProductData = useCallback(
    throttle(() => {
      axiosInstance
        .get(`/api/sell`)
        .then((response) => {
          console.log('Response:', response.data);
          setProductData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching category data:', error);
        });
    }, 2000), 
    []
  );

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const memoizedProductData = useMemo(() => productData, [productData]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <Categories userId={userId} categoriesproductData={memoizedProductData} />
      <TrendingCodesPage userId={userId} codesproductData={memoizedProductData} />
    </div>
  );
};

export default ExplorePage;
