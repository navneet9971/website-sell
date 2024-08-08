import React from 'react';
import { useParams } from 'react-router-dom';
import ReletedProduct from './productInfoComponents/SectionThird/ReletedProduct';
import ImageSection from './productInfoComponents/SectionOne/ImagesSection';
import ImageInformation from './productInfoComponents/SectionOne/ImageInformation';
import ProductUser from './productInfoComponents/SectionTwo/ProductUser';
import ProductDes from './productInfoComponents/SectionTwo/ProductDes';
import Cookies from 'js-cookie';

const ProductInfoPage = () => {
  const { id } = useParams(); // Destructure the id from the params
  const userId  = Cookies.get("userId")

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
        <ReletedProduct id={id} />
      </div>
    </div>
  );
};

export default React.memo(ProductInfoPage); // Memoize component for performance optimization
