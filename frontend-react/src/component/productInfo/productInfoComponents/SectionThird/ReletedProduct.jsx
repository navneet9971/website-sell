import React from 'react';
import { useNavigate } from 'react-router-dom';
import PagesGrid from '../../../../globalComponent/PagesGrid';
import { useProductData } from '../../../../globalComponent/SellDataContext';
import CustomCarousel from '../../../ui/Crousel';

const ReletedProduct = () => {
  const { productData } = useProductData();
  console.log(productData);
  

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    window.scrollTo(0, 0);
    navigate(`/productInfo/${id}`);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <h1 className="text-3xl font-bold">
        Related <span className="text-indigo-600">Products</span>
      </h1>
      <div className="w-full">
        <CustomCarousel itemsPerSlide={4}>
          {productData.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCardClick(item._id)}
              className="cursor-pointer p-2"
            >
              <PagesGrid 
                data={[item]}
              />
            </div>
          ))}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default ReletedProduct;
