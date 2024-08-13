import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import CartPage from '../component/Navbar/NavbarComponent/CartComponent/CartPage/CartPage';
import ProductLikePage from '../component/Navbar/NavbarComponent/LikeComponent/LikedPage/ProductLikedPage';
import ExplorePage from '../component/pages/ExplorePage';
import CategoriesListPage from '../component/HomePage/SeparatePages/CategoriesListPage';
import TrendingCodeListPage from '../component/HomePage/SeparatePages/TrendingCodeListPage';
import TrendingWebsitePage from '../component/HomePage/SeparatePages/TrendingWebsitePage';
import ProductInfo from '../component/productInfo/productInfo';
import CollectionPage from '../component/pages/CollectionPage';
import SellCode from '../component/pages/SellcodeMain/SellCode';
import BuyCodePage from '../component/pages/BuyCodePage';
import ProtectedRoute from './ProtectedRoute';
import Signup from '../auth/singup/signup';
import Signin from '../auth/signin/signin';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import VerifyEmail from '../auth/verifyEmail/VerifyEmail';
import CompleteSignUpPage from '../auth/CompleteSignUp/CompleteSignUpPage';
import UserProfile from '../component/ProfileSection/UserProfile';


const MainRoutes = () => {


  return (
    <div className="mt-24">
      <Routes>
        <Route path= "/sign-up/*" element={<Signup />} />
        <Route path= "/sign-in/*"  element={<Signin />} />
        <Route path="/email-verification" element={<VerifyEmail />} />
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback />}
        />
          <Route path="/complete-sign-up" element={<CompleteSignUpPage />} />






        <Route path="/" element={<ExplorePage />} />
        <Route path="/navbar/cartInfo" element= {<ProtectedRoute element={<CartPage />} />}/>
        <Route path="/navbar/likeInfo" element={ <ProtectedRoute element={<ProductLikePage />} />} />

        {/* SeparatePages */}
        <Route path="/homepagedata/categoryList" element={<CategoriesListPage />} />
        <Route path="/homepagedata/trendingcodes" element={<TrendingCodeListPage />} />
        <Route path="/homepagedata/trendingWebsiteList" element={<TrendingWebsitePage />} />
        <Route path="/productInfo/:id" element={<ProductInfo />} />
        <Route path="/userProfile" element={<UserProfile />} />

        {/* Protected Routes */}
        <Route path="/collection" element={<ProtectedRoute element={<CollectionPage />} />} />
        <Route path="/buycode" element={<ProtectedRoute element={<BuyCodePage />} />} />
        <Route path="/sellcode" element={<ProtectedRoute element={<SellCode />} />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
