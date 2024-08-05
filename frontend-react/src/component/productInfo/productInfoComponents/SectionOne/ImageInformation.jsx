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

const ImageInformation = ({ id, userId }) => {

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
            navigation('/login')
            return;
        } else {
            navigation(`/purchase-code/${id}`);
        }
    }

    const isInCart = cartItems.includes(id);

    return (
        <div className='w-full h-full border-black bg-slate-200'>
            <h1 className='bg-blue-400 text-white font-bold text-2xl px-4'>Product Information</h1>

            <div className='flex items-start justify-around py-3'>
                <h1 className='text-3xl font-bold'><span>&#8377;</span>100</h1>

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
                    {languge.map((lang) => (
                        <div key={lang.value} className='box-border font-semibold bg-white text-xs shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
                            <h1 className=''>{lang.label}</h1>
                        </div>
                    ))}
                </div>

                <div className='flex items-center justify-start gap-2 mt-6'>
                    <HiBuildingOffice2 size={20} />
                    <h1 className='font-bold text-sm'>Usability</h1>
                </div>

                <div className='flex items-center gap-2 mt-2'>
                    {use.map((ablity) => (
                        <div key={ablity.value} className='box-border font-semibold text-xs bg-white shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
                            <h1 className=''>{ablity.label}</h1>
                        </div>
                    ))}
                </div>

                <div className='flex flex-col items-start gap-2 mt-8 '>
                    <div className='flex items-center gap-2'>
                        <FaFileCode size={20} />
                        <h1 className='font-bold text-sm'>Code specification</h1>
                    </div>

                    <div className='flex  items-center gap-4'>
                        <Button variant="default" className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                            <FaBookBookmark size={20} />
                            User Guide
                        </Button>
                        <Button variant="default" className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                            <FaFileCode size={20} />
                            Code Insight
                        </Button>
                        <Button variant="default" className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                            <FaPlay size={20} />
                            Live Perview
                        </Button>
                    </div>
                </div>

                <div className='flex items-start gap-1 mt-6'>
                    <FaCircleUser size={20} />
                    <h1 className='font-bold text-md'>Publish By Username</h1>
                </div>

                <div className='flex items-start gap-1 mt-2 py-3'>
                    <FaCheck size={30} color='lightgreen' />
                    <h1 className='font-bold text-xl'>Product inspected by Coders</h1>
                </div>

                <div className='flex justify-center items-center py-4'>
                    <Button
                        variant="destructive"
                        onClick={handlePurchaseCode}
                        className="flex items-center gap-2 w-2/3 hover:bg-green-600" >
                        <h1 className='font-bold text-2xl'> Purchase Code </h1>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ImageInformation;
