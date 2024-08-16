import React, { useEffect, useState } from 'react'
import { Categories } from '../HomePage/Categories'
import TrendingCodesPage from '../HomePage/TrendingCodesPage'
import Cookies from 'js-cookie';
import axiosInstance from '../../interceptor/axiosInstance';

const ExplorePage = () => {
  const userId = Cookies.get("userId")
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/api/sell`)
      .then((response) => {
        console.log("Response:", response.data);
        setproductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);



  return (
    <div className='flex flex-col items-center justify-center' >
      <Categories
        userId={userId}
        categoriesproductData={productData}
      />
      <TrendingCodesPage
        userId={userId}
        codesproductData={productData}
      />
    </div>
  )
}

export default ExplorePage