// mainRoutes.js
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import AddCart from "../component/Navbar/NavbarComponent/CartComponent/AddCartShop/AddCart";
import AddLike from "../component/Navbar/NavbarComponent/LikeComponent/AddLikeButton/AddLike";


const MainRoutes = () => {
  return (
      <Routes>
        <Route path="/navbar/cartInfo" element={<AddCart />} />
        <Route path="/navbar/likeInfo" element={<AddLike />} />
      </Routes>
  );
};

export default MainRoutes;
