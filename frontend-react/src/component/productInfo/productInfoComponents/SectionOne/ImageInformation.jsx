import { Button } from '../../../ui/button';
import React, { useState } from 'react';
import { FaComputer, FaCheck, FaFileCode, FaCircleUser, FaProductHunt  } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FcMultipleDevices } from "react-icons/fc";
import ButtonLivePerview from './ButtonsSection/ButtonLivePerview';
import ButtonVidePerview from './ButtonsSection/ButtonVidePerview';
import ButtonUserGuide from './ButtonsSection/ButtonUserGUide';
import {ProductAddCart} from './AddCart&Like/ProductAddCart';
import {ProductAddLike} from './AddCart&Like/ProductAddLike';
import RazorpayPayment from '../../../AccountDetails/AccountDetails';
import { Popup } from '../../../ui/BentoGrid';
import { GiCrownedSkull } from "react-icons/gi";


const ImageInformation = ({ id, userId, productInfo }) => {

    const navigate = useNavigate();
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);


    const handlePurchaseCode = () => {
        if (!userId) {
            toast.error('Please login first!');
            navigate('/sign-up');
            return;
        } else if (productInfo.purchased) {
            toast.success(`Download product Code`);
            window.location.href = productInfo.projectCode;
        } else {
            setShowPaymentPopup(true);
        }
    };
    

    const handlePaymentSuccess = (response) => {
        console.log('Payment successful:', response);
        setShowPaymentPopup(false); 
        navigate('/buyCode')
      };

    // const isInCart = cartItems.includes(id);
    //languages colud be seprite her because backend they will not send with differnt index
    const languagesArray = (productInfo.programmingLanguage[0] || '').split(',').map(lang => lang.trim());
    console.log(productInfo)

    const buttonText = productInfo.purchased 
    ? 'Code Download'
    : 'Purchase Code'

    const buttonClass = productInfo.purchased 
    ? 'bg-green-500 text-black border-green-800 hover:bg-green-400'
    : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600';

    return (
        <div className='w-full h-full border-black bg-slate-200'>
            <h1 className='bg-blue-400 text-white font-bold text-2xl px-4'>Product Information</h1>

            <div className='flex items-start justify-around py-3'>
<h1 className={`text-3xl font-bold ${productInfo.purchased ? 'text-red-500' : ''}`}>
    {productInfo.purchased ? (
        <div className='flex items-center'>
            Owned <GiCrownedSkull color="black" /> 
        </div>
    ) : (
        <>
            <span>&#8377;</span>{productInfo.price}
        </>
    )}
</h1>




                <div className='flex items-center justify-center gap-5'>
                  <ProductAddCart
                  productInfo={productInfo}
                  userId={userId}
                  />

<ProductAddLike 
productInfo= {productInfo}
userId ={userId}
/>
                   
                </div>
            </div>

            <div className='px-3 mt-3'>

            <div className='flex items-center justify-start gap-2'>
                    <FaProductHunt  size={20} />
                    <h1 className='font-bold text-sm'>Product Name</h1>
                </div>
                <div className='flex items-center gap-2 mb-3 mt-1'>
                <h1 className='font-bold text-xl '>{productInfo.productTitle} </h1>
                    </div>


                <div className='flex items-center justify-start gap-2'>
                    <FaComputer size={20} />
                    <h1 className='font-bold text-sm'>Programming Language</h1>
                </div>

                <div className='flex flex-wrap items-center gap-2 mt-2'>
    {languagesArray.length > 0 ? (
        languagesArray.map((lang, index) => (
            <div key={index} className='box-border font-semibold bg-white text-xs shadow-lg shadow-indigo-500/25 p-1 rounded'>
                <h1 className=''>{lang}</h1>
            </div>
        ))
    ) : (
        <p>No programming languages specified</p>
    )}
</div>


                <div className='flex items-center justify-start gap-2 mt-6'>
                    <HiBuildingOffice2 size={20} />
                    <h1 className='font-bold text-sm'>Usability</h1>
                </div>

                <div className='flex flex-wrap items-center gap-2 mt-2'>
    {productInfo.industry.map((indu, index) => (
        <div key={index} className='box-border font-semibold text-xs bg-white shadow-lg shadow-indigo-500/25 p-1 rounded'>
            <h1 className=''>{indu}</h1>
        </div>
    ))}
</div>


                <div className='flex items-center justify-start gap-2 mt-6'>
                    <FcMultipleDevices size={20} />
                    <h1 className='font-bold text-sm'>Devices</h1>
                </div>

                <div className='flex flex-wrap items-center gap-2 mt-2'>
    {productInfo.devices.map((device, index) => (
        <div key={index} className='box-border font-semibold text-xs bg-white shadow-lg shadow-indigo-500/25 p-1 rounded'>
            <h1 className=''>{device}</h1>
        </div>
    ))}
</div>



                <div className='flex flex-col items-start gap-2 mt-8 '>
                    <div className='flex items-center gap-2'>
                        <FaFileCode size={20} />
                        <h1 className='font-bold text-sm'>Code specification</h1>
                    </div>

                    <div className='flex  items-center gap-4'>
                        <ButtonUserGuide 
                        productInfo={productInfo}
                        />


                        <ButtonVidePerview 
                         productInfo={productInfo}
                        />

                        <ButtonLivePerview
                            productInfo={productInfo}
                        />
                    </div>
                </div>

                <div className='flex items-start gap-1 mt-6'>
                    <FaCircleUser size={20} />
                    <h1 className='font-bold text-md'>Publish By Username : {productInfo.userData.userName}</h1>
                </div>

                <div className='flex items-start gap-1 mt-2 py-3'>
                    <FaCheck size={30} color='lightgreen' />
                    <h1 className='font-bold text-xl'>Product inspected by Coders</h1>
                </div>

                <div className='flex justify-center items-center py-4'>
                    <Button
                        variant="destructive"
                        onClick={handlePurchaseCode}
                        className={`flex items-center gap-2 w-2/3 ${buttonClass}`} >
                        <h1 className='font-bold text-2xl'> {buttonText} </h1>
                    </Button>
                </div>
            </div>

            {showPaymentPopup && (
        <Popup isOpen={showPaymentPopup} onClose={() => setShowPaymentPopup(false)} title="Confirm Payment">
          <p>Are you sure you want to proceed with the payment?</p>
          
          {/* RazorpayPayment Component */}
          <RazorpayPayment
            price={productInfo.price}
            title={productInfo.productTitle}
            description={productInfo.description}
            productId = {productInfo._id}
            userId={userId}
            img={productInfo.projectImages[0]}
            onSuccess={handlePaymentSuccess} 
          />
        </Popup>
      )}

        </div>
    )
}

export default ImageInformation;
