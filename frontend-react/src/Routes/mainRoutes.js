import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';


// Lazy-loaded components
const CartPage = lazy(() => import('../component/Navbar/NavbarComponent/CartComponent/CartPage/CartPage'));
const ProductLikePage = lazy(() => import('../component/Navbar/NavbarComponent/LikeComponent/LikedPage/ProductLikedPage'));
const ExplorePage = lazy(() => import('../component/pages/ExplorePage'));
const CategoriesListPage = lazy(() => import('../component/HomePage/SeparatePages/CategoriesListPage'));
const TrendingCodeListPage = lazy(() => import('../component/HomePage/SeparatePages/TrendingCodeListPage'));
const SellCode = lazy(() => import('../component/pages/SellcodeMain/SellCode'));
const BuyCodePage = lazy(() => import('../component/pages/BuyCodePage'));
const Signup = lazy(() => import('../auth/singup/signup'));
const Signin = lazy(() => import('../auth/signin/signin'));
const VerifyEmail = lazy(() => import('../auth/verifyEmail/VerifyEmail'));
const CompleteSignUpPage = lazy(() => import('../auth/CompleteSignUp/CompleteSignUpPage'));
const UserProfile = lazy(() => import('../component/ProfileSection/UserProfile'));
const ProductInfo = lazy(() => import('../component/productInfo/productInfo'));


const MainRoutes = () => {
  return (
    <div className="mt-24">
      <Suspense fallback={<div>Loading..</div>}>
        <Routes>
          <Route path="/sign-up/*" element={<Signup />} />
          <Route path="/sign-in/*" element={<Signin />} />
          <Route path="/email-verification" element={<VerifyEmail />} />
          <Route
            path="/sso-callback"
            element={<AuthenticateWithRedirectCallback />}
          />
          <Route path="/complete-sign-up" element={<CompleteSignUpPage />} />
          <Route path="/" element={<ExplorePage />} />
          <Route
            path="/navbar/cartInfo"
            element={<ProtectedRoute element={<CartPage />} />}
          />
          <Route
            path="/navbar/likeInfo"
            element={<ProtectedRoute element={<ProductLikePage />} />}
          />
          {/* SeparatePages */}
          <Route
            path="/homepagedata/categoryList"
            element={<CategoriesListPage />}
          />
          <Route
            path="/homepagedata/trendingcodes"
            element={<TrendingCodeListPage />}
          />
          {/* <Route path="/homepagedata/trendingWebsiteList" element={<TrendingWebsitePage />} /> */}
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/userProfile" element={<UserProfile />} />

          {/* Protected Routes */}
          <Route
            path="/buycode"
            element={<ProtectedRoute element={<BuyCodePage />} />}
          />
          <Route
            path="/sellcode"
            element={<ProtectedRoute element={<SellCode />} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainRoutes;
