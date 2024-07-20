"use client";

import ProductInfoPage from '@/components/ProductComponent/ProductInfoPage'
import { useParams } from 'next/navigation';
import React from 'react'

const ProductInfo = () => {
  const params = useParams();
  const { id } = params;

  console.log(id);

  return (
    <ProductInfoPage  id={id}/>
  );
}

export default ProductInfo;
