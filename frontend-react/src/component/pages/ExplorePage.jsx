import React from 'react';
import Categories from '../HomePage/Categories';
import TrendingCodesPage from '../HomePage/TrendingCodesPage';
import { useProductData } from '../../globalComponent/SellDataContext';

const ExplorePage = () => {
  const { productData, userId } = useProductData();

  
  const hasData = productData && productData.length > 0;

  return (
    <div className='flex flex-col items-center justify-center'>
      {hasData ? (
        <>
          <Categories userId={userId} categoriesproductData={productData} />
          <TrendingCodesPage userId={userId} codesproductData={productData} />
        </>
      ) : (
        <p>The website does not have any data available at the moment.</p>
      )}
    </div>
  );
};

export default ExplorePage;
