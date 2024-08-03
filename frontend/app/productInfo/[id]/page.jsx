"use server"

import ProductInfoPage from '/components/ProductComponent/ProductInfoPage'
import { auth } from "@clerk/nextjs/server";


import React from 'react'

const ProductInfo = () => {
const { userId } = auth()


  return (
    <ProductInfoPage  
    userId={userId} 
    />
  );
}

export default ProductInfo;
