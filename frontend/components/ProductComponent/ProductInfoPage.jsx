import React from 'react';
import dynamic from 'next/dynamic';
import ReletedProduct from './SectionThird/ReletedProduct';

const ImageSection = dynamic(() => import('./SectionOne/ImagesSection'), { ssr: true });
const ImageInformation = dynamic(() => import('./SectionOne/ImageInformation'), { ssr: true });
const ProductUser = dynamic(() => import('./SectionTwo/ProductUser'), { ssr: true });
const ProductDes = dynamic(() => import('./SectionTwo/ProductDes'), { ssr: true });

const ProductInfoPage = () => {
  return (
    <div className='mb-6'>
      <div className="flex items-start justify-between px-8">
        <div className="flex-1">
          <ImageSection />
        </div>
        <div className="flex-1 shadow-lg shadow-black/40">
          <ImageInformation />
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

export default React.memo(ProductInfoPage); //React memo use save old data on cache if props was not change show old data 
