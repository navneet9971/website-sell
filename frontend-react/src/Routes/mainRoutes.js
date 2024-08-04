// mainRoutes.js
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import CartPage from '../component/Navbar/NavbarComponent/CartComponent/CartPage/CartPage';
import ProductLikePage from '../component/Navbar/NavbarComponent/LikeComponent/LikedPage/ProductLikedPage';
import ExplorePage from '../component/pages/ExplorePage';
import CategoriesListPage from '../component/HomePage/SeparatePages/CategoriesListPage';
import TrendingCodeListPage from '../component/HomePage/SeparatePages/TrendingCodeListPage';
import TrendingWebsitePage from '../component/HomePage/SeparatePages/TrendingWebsitePage';


const MainRoutes = () => {
  return (
    <div className='mt-16'>
      <Routes>
        <Route path='/' element={<ExplorePage />} />
        <Route path="/navbar/cartInfo" element={<CartPage />} />
        <Route path="/navbar/likeInfo" element={<ProductLikePage />} />


        {/* SeparatePages */}
        <Route path="/homepagedata/categoryList" element={<CategoriesListPage  />} />
        <Route path="/homepagedata/trendingcodes" element={<TrendingCodeListPage />} />
        <Route path="/homepagedata/trendingWebsiteList"  element={<TrendingWebsitePage />} />
      </Routes>
      </div>
  );
};

export default MainRoutes;
