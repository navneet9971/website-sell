import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import CartPage from '../component/Navbar/NavbarComponent/CartComponent/CartPage/CartPage';
import ProductLikePage from '../component/Navbar/NavbarComponent/LikeComponent/LikedPage/ProductLikedPage';
import ExplorePage from '../component/pages/ExplorePage';
import CategoriesListPage from '../component/HomePage/SeparatePages/CategoriesListPage';
import TrendingCodeListPage from '../component/HomePage/SeparatePages/TrendingCodeListPage';
import TrendingWebsitePage from '../component/HomePage/SeparatePages/TrendingWebsitePage';
import ProductInfo from '../component/productInfo/productInfo';
import CollectionPage from '../component/pages/CollectionPage';
import SellCode from '../component/pages/SellcodeMain/SellCode';
// import SignIn from '../auth/signin/signin';
// import SignUp from '../auth/singup/signup';



const MainRoutes = () => {
  return (
    
    <div className='mt-24'>
      <Routes>
        {/* <Route path= "/sign-in" element={<SignIn />} />
        <Route path= "/sign-up"  element={<SignUp />} /> */}


        <Route path='/' element={<ExplorePage />} />
        <Route path="/navbar/cartInfo" element={<CartPage />} />
        <Route path="/navbar/likeInfo" element={<ProductLikePage />} />


        {/* SeparatePages */}
        <Route path="/homepagedata/categoryList" element={<CategoriesListPage  />} />
        <Route path="/homepagedata/trendingcodes" element={<TrendingCodeListPage />} />
        <Route path="/homepagedata/trendingWebsiteList"  element={<TrendingWebsitePage />} />
        <Route path={`/productInfo/:id`} element={<ProductInfo />} />


{/* second Routes Pages */}
<Route path= "/collection" element={<CollectionPage />} />
<Route path= "/buycode" element={<ExplorePage />} />
<Route path = "/sellcode" element={<SellCode />} />


      </Routes>
      </div>
  );
};

export default MainRoutes;
