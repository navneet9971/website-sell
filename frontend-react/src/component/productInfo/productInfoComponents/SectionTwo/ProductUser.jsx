import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import React from 'react';
import { FaUserSecret } from "react-icons/fa";
import ReviewUser from "./ReviewUser/ReviewUser";
import NegotiatePrice from "./UserConnect/NegotiatePrice";
import RequestCodeSimple from "./UserConnect/RequestCodeSimple";
import HelpDesk from "./UserConnect/HelpDesk";
import SellSupport from "./UserConnect/SellSupport";

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

const ProductUser = ({ productInfo, productId }) => {

  const handleHireDev = () => {
    alert("Please Hire Me");
  };

  console.log(productInfo);

  return (
    <>

      <div className="w-[27rem] h-full border-black bg-slate-200 mb-5">
        <h1 className='bg-blue-400 text-white font-bold text-2xl text-center'>Submit Your Review</h1>

        <div className=" overflow-hidden">
          <ReviewUser
            productId={productId}
          />
        </div>
      </div>


      <div className='w-[27rem] h-full border-black bg-slate-200'>
        <h1 className='bg-blue-400 text-white font-bold text-2xl text-center'>Developer</h1>

        <div className='flex flex-col items-center justify-center mt-8 gap-3'>
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={productInfo.userData.image}
              className="object-cover"
            />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-md">{productInfo.userData.userName}</h2>
          <FaUserSecret size={25} onClick={handleHireDev} className="cursor-pointer" />
            <NegotiatePrice
              productInfo={productInfo}
            />

            <RequestCodeSimple
              productInfo={productInfo}
            />

            <SellSupport
              productInfo={productInfo}
            />

            <HelpDesk
              productInfo={productInfo}
            />

          <div className="flex flex-col items-center justify-center gap-1 mb-2">
            <h1 className="text-sm">Project Upload Date </h1>
            <h1 className="text-sm font-bold">{formatDate(productInfo.currentDate)} </h1>
          </div>
        </div>
      </div>


    </>
  );
};

export default ProductUser;
