import { cn } from "../../lib/utils";
import { Button } from "./button";
import { LiaFileCodeSolid, LiaIndustrySolid } from "react-icons/lia";
import { MdDevices } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { AddCartBento } from "../productInfo/productInfoComponents/SectionOne/AddCart&Like/ProductAddCart";
import { AddLikeBento } from "../productInfo/productInfoComponents/SectionOne/AddCart&Like/ProductAddLike";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import RazorpayPayment from "../AccountDetails/AccountDetails";
import Cookies from 'js-cookie';

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  key, // Id of Product
  className,
  title,
  description,
  language,
  industry,
  devices,
  img,
  onClick,
  price,
  userId,
  productId,
  totalReview,
  purchased
}) => {

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const navigate = useNavigate();
  const priceNumber = parseFloat(price);
  const truncateNames = (names) => {
    if (names.length <= 3) {
      return names.join(', ');
    }
    return `${names.slice(0, 3).join(', ')}...`;
  };
  const languageNames = language ? language.split(',').map(name => name.trim()) : [];
  const industryNames = industry ? industry.split(',').map(name => name.trim()) : [];
  const deviceNames = devices ? devices.split(',').map(name => name.trim()) : [];

  const handleBuyItem = () => {
    if (!userId) {
      navigate('/sign-up');
    } else {
      setShowPaymentPopup(true);
    }
  };

  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    setShowPaymentPopup(false); 
    navigate('/buyCode')
  };

  const buttonText = purchased 
    ? 'Owned' 
    : (priceNumber === 0 ? 'Free' : 'Buy');

    const buttonClass = purchased
    ? 'bg-green-200 text-black border-green-800 cursor-not-allowed'
    : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600';
  // Disable the button if the item is purchased
  const isDisabled = purchased;

  return (
    <div
      className={cn(
        "w-72 h-[30.8rem] overflow-hidden row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-gray-100 border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      key={key}
    >
      <div className="relative">
        <LazyLoadImage
          effect="blur"
          src={img}
          width={257}
          height={155}
          alt="Bento Item"
          className="h-40 object-cover"
        />

{!purchased && (
  <>
    <AddLikeBento
      productId={productId}
      productTitle={title}
      codedescription={description}
      price={price}
      projectImages={img}
    />

    <AddCartBento
      productId={productId}
      productTitle={title}
      price={price}
      projectImages={img}
      industry={industry}
    />
  </>
)}

        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-sans text-xl font-bold text-neutral-800 dark:text-neutral-200  mt-2 cursor-pointer hover:text-neutral-400 " onClick={onClick}>
            {title}
          </div>
          <div className='flex space-x-1 mb-3'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${star <= totalReview.overallRating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </span>
            ))}
            <p className='flex items-start justify-start  mt-[.177rem] text-xs'>{totalReview.overallRating} out of 5</p>
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mb-3 line-clamp-2 cursor-default">
            {description}
          </div>

          <div className="flex flex-col items-start justify-center gap-2 mt-4 cursor-default">
            <div className="flex items-start justify-start gap-1">
              <LiaFileCodeSolid size={22} color="blue" />
              <h1 className="text-xs font-bold text-start py-1">{truncateNames(languageNames)}</h1>
            </div>

            <div className="flex items-start justify-start gap-1">
              <LiaIndustrySolid size={22} color="blue" />
              <h1 className="text-xs font-bold text-start py-1">{truncateNames(industryNames)}</h1>
            </div>

            <div className="flex items-start justify-start gap-1">
              <MdDevices size={22} color="blue" />
              <h1 className="text-xs font-bold text-start py-1">{truncateNames(deviceNames)}</h1>
            </div>
          </div>

          <div className="flex justify-between items-center mt-7">
            <Button
              variant="outline"
              className={`w-24 h-10 ${buttonClass} font-bold text-xl px-2 py-1 rounded-md transition duration-200`}
              onClick={!isDisabled ? handleBuyItem : null} 
              disabled={isDisabled} 
            >
             {buttonText}
            </Button>
            {!purchased && (
  <div className="text-neutral-800 font-bold text-2xl dark:text-neutral-300 cursor-default">
    &#8377; {price}
  </div>
)}

          </div>
        </div>
      </div>

     {/* Popup to confirm payment */}
     {showPaymentPopup && (
        <Popup isOpen={showPaymentPopup} onClose={() => setShowPaymentPopup(false)} title="Confirm Payment">
          <p>Are you sure you want to proceed with the payment?</p>
          
          {/* RazorpayPayment Component */}
          <RazorpayPayment
            price={price}
            title={title}
            description={description}
            productId = {productId}
            userId={userId}
            img={img}
            onSuccess={handlePaymentSuccess} 
          />
        </Popup>
      )}

    </div>
  );
};


export const Popup = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};






