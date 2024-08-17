import React from 'react';
import Categories from '../HomePage/Categories';
import TrendingCodesPage from '../HomePage/TrendingCodesPage';
import { useProductData } from '../../globalComponent/SellDataContext';


const ExplorePage = () => {
  const { productData, userId } = useProductData();

  return (
    <div className='flex flex-col items-center justify-center'>
      <Categories userId={userId} categoriesproductData={productData} />
      <TrendingCodesPage userId={userId} codesproductData={productData} />
    </div>
  );
};

export default ExplorePage;
