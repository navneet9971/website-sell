import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReletedProduct from './productInfoComponents/SectionThird/ReletedProduct';
import ImageSection from './productInfoComponents/SectionOne/ImagesSection';
import ImageInformation from './productInfoComponents/SectionOne/ImageInformation';
import ProductUser from './productInfoComponents/SectionTwo/ProductUser';
import ProductDes from './productInfoComponents/SectionTwo/ProductDes';
import Cookies from 'js-cookie';
import axiosInstance from '../../interceptor/axiosInstance';
import ReviewSection from './productInfoComponents/SectionFour/ReviewSection';

const ProductInfoPage = () => {
  const { id } = useParams();
  const userId = Cookies.get("userId");
  const [productInfoData, setProductInfoData] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/api/sell/?productId=${id}`)
      .then((response) => {
        console.log("Response:", response.data[0]);
        setProductInfoData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching product info:", error);
      });
  }, [id]);


  if (!productInfoData) return <div>Loading...</div>;

  return (
    <div className='mb-6'>
      <div className="flex items-start justify-between px-8">
        <div className="flex-1">
          <ImageSection
            id={id}
            userId={userId}
            productImages={productInfoData.projectImages || []}
          />
        </div>

        <div className="flex-1 shadow-lg shadow-black/40">
          <ImageInformation
            id={id}
            userId={userId}
            productInfo={productInfoData}
          />
        </div>
      </div>

      <div className="flex items-start justify-between px-8 mt-10">
        <div className="w-5/12">
          <ProductUser
          userId={userId}
            productInfo={productInfoData}
            productId={id}
          />
        </div>
        <div className="w-[60rem]">
          <ProductDes
            description={productInfoData.codeDescription}
            appwork={productInfoData.installationInstructions}
            features={productInfoData.features}
            tags={productInfoData.tags}
            industry={productInfoData.industry}
            appUse={productInfoData.appUse}
            userName={productInfoData.userData.userName}
          />
        </div>
      </div>

      <div className='flex items-start justify-start mt-10 px-8'>
        <ReletedProduct id={id} />
      </div>

      <div className='flex items-start justify-start mt-20 px-8'>
        <ReviewSection id={id} 
          productId={id}
        />
      </div>
    </div>
  );
};

export default React.memo(ProductInfoPage);
