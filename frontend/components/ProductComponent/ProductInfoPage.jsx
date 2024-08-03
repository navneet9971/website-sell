"use client"

import React from 'react';
import ReletedProduct from './SectionThird/ReletedProduct';
import ImageSection from './SectionOne/ImagesSection';
import ImageInformation from './SectionOne/ImageInformation';
import ProductUser from './SectionTwo/ProductUser';
import ProductDes from './SectionTwo/ProductDes';
import { useParams } from 'next/navigation';

const ProductInfoPage = ({ userId }) => {
  const params = useParams();
  const { id } = params;

  console.log(userId); // Debugging: Ensure userId is available

  return (
    <div className='mb-6'>
      <div className="flex items-start justify-between px-8">
        <div className="flex-1">
          <ImageSection id={id} />
        </div>

        <div className="flex-1 shadow-lg shadow-black/40">
          <ImageInformation id={id} userId={userId} />
        </div>
      </div>

      <div className="flex items-start justify-between px-8 mt-10">
        <div className="w-5/12">
          <ProductUser />
        </div>
        <div className="w-2/3">
          <ProductDes />
        </div>
      </div>

      <div className='flex items-start justify-start mt-10 px-8'>
        <ReletedProduct />
      </div>
    </div>
  );
};

export default React.memo(ProductInfoPage); // Memoize component for performance optimization
