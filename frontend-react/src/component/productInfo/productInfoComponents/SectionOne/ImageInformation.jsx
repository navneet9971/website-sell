import { Button } from '../../../ui/button';
import { languge, use } from '../../../../data/data';
import useCountNum from '../../../../globalComponent/countNumber/useCountNum';

import React, { useState } from 'react';
import { FaComputer, FaCheck, FaFileCode, FaHandHoldingHeart, FaCircleUser, FaCartPlus, FaBookBookmark, FaPlay } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaGrinHearts } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FcMultipleDevices } from "react-icons/fc";
import ButtonUserGuid from './ButtonsSection/ButtonUserGuid';
import ButtonCodeInsight from './ButtonsSection/ButtonCodeInsight';
import ButtonLivePerview from './ButtonsSection/ButtonLivePerview';


const ImageInformation = ({ id, userId, productInfo }) => {

    const [liked, setLiked] = useState(false);
    const [likedItems, setLikedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { increaseLikeCount, decreaseLikeCount, increaseCartCount, decreaseCartCount } = useCountNum();
    const navigation = useNavigate();

    const handleButtonClick = () => {
        if (!userId) {
            toast.error('Please login first!');
            return;
        }

        if (liked) {
            setLiked(false);
            setLikedItems((prevLikedItems) => prevLikedItems.filter((item) => item !== id));
            decreaseLikeCount();
            toast.error('Item removed from likes!');
        } else {
            setLiked(true);
            setLikedItems((prevLikedItems) => [...prevLikedItems, id]);
            increaseLikeCount();
            toast.success('Item liked!');
        }
    };

    const handleAddCart = () => {
        if (!userId) {
            toast.error('Please login first!');
            return;
        }

        if (cartItems.includes(id)) {
            setCartItems(cartItems.filter(item => item !== id));
            decreaseCartCount();
            toast.error('Item removed from cart!');
        } else {
            setCartItems([...cartItems, id]);
            increaseCartCount();
            toast.success('Item added to cart!');
        }
    };


    const handlePurchaseCode = () => {
        if (!userId) {
            toast.error('Please login first!');
            navigation('/sign-up')
            return;
        } else {
            navigation(`/purchase-code/${id}`);
        }
    }


    const handleUseguide = () => {
        if (productInfo.useGuide) {
            alert('working')
        } else {
            toast.error('No use guide available');
        }
    };



    const isInCart = cartItems.includes(id);
    //languages colud be seprite her because backend they will not send with differnt index
    const languagesArray = (productInfo.programmingLanguage[0] || '').split(',').map(lang => lang.trim());


    return (
        <div className='w-full h-full border-black bg-slate-200'>
            <h1 className='bg-blue-400 text-white font-bold text-2xl px-4'>Product Information</h1>

            <div className='flex items-start justify-around py-3'>
                <h1 className='text-3xl font-bold'><span>&#8377;</span>{productInfo.price}</h1>

                <div className='flex items-center justify-center gap-5'>
                    <Button onClick={handleAddCart} variant="outline"
                        className={`flex items-center gap-2 ${isInCart ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                        {isInCart ? <BsFillCartCheckFill /> : <FaCartPlus />}
                        {isInCart ? 'Added' : 'Add to cart'}
                    </Button>

                    <Button onClick={handleButtonClick} variant="destructive"
                        className={`flex items-center gap-2 ${liked ? 'bg-pink-600' : 'bg-red-600'}`}>
                        {liked ? <FaGrinHearts /> : <FaHandHoldingHeart />}
                        {liked ? "Loved" : "Favorites"}
                    </Button>
                </div>
            </div>

            <div className='px-3 mt-3'>
                <div className='flex items-center justify-start gap-2'>
                    <FaComputer size={20} />
                    <h1 className='font-bold text-sm'>Programming Language</h1>
                </div>

                <div className='flex items-center gap-2 mt-2'>
                    {languagesArray.length > 0 ? (
                        languagesArray.map((lang, index) => (
                            <div key={index} className='box-border font-semibold bg-white text-xs shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
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

                <div className='flex items-center gap-2 mt-2'>
                    {productInfo.industry.map((indu, index) => (
                        <div key={index} className='box-border font-semibold text-xs bg-white shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
                            <h1 className=''>{indu}</h1>
                        </div>
                    ))}
                </div>

                <div className='flex items-center justify-start gap-2 mt-6'>
                    <FcMultipleDevices size={20} />
                    <h1 className='font-bold text-sm'>Devices</h1>
                </div>

                <div className='flex items-center gap-2 mt-2'>
                    {productInfo.devices.map((device, index) => (
                        <div key={index} className='box-border font-semibold text-xs bg-white shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
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
                        <ButtonUserGuid />
                        <ButtonCodeInsight />

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
                        className="flex items-center gap-2 w-2/3 text-white bg-blue-600 hover:bg-blue-400 hover:text-black" >
                        <h1 className='font-bold text-2xl'> Purchase Code </h1>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ImageInformation;
