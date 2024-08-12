import React, { useEffect, useState } from 'react';
import { FaGrinHearts } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useLike } from '../../../../../globalComponent/LikeContext';
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { Button } from '../../../../ui/button';
import Cookies from 'js-cookie';
import { FaHeartBroken, FaHeart } from "react-icons/fa";

export const ProductAddLike = ({ productInfo, userId }) => {
    const { dispatch } = useLike();
    const [likedItems, setLikedItems] = useState([]);
    const id = productInfo._id;

    const likeForm = {
        productTitle: productInfo.productTitle,
        price: productInfo.price,
        user_id: userId,
        product_id: id,
        projectImages: productInfo.projectImages[0],
        codeDescription: productInfo.codeDescription,
    };

    useEffect(() => {
        const fetchLikeItems = async () => {
            if (userId) {
                try {
                    const response = await axiosInstance.get('/api/user-like', { params: { user_id: userId } });
                    const userLikeItems = response.data.data.map(item => item.product_id);
                    setLikedItems(userLikeItems);
                    dispatch({ type: 'UPDATE_LIKE_COUNT', payload: response.data.data.length || 0 });
                } catch (error) {
                    console.error('Error fetching like items:', error);
                }
            }
        };

        fetchLikeItems();
    }, [userId, dispatch]);

    const handleButtonClick = async () => {
        if (!userId) {
            toast.error('Please login first!');
            return;
        }

        try {
            if (likedItems.includes(id)) {
                // Remove from Like
                await axiosInstance.delete('/api/remove-like', { data: likeForm });
                setLikedItems(prevItems => prevItems.filter(item => item !== id));
                dispatch({ type: 'REMOVE_FROM_LIKE', payload: { product_id: id } });
                toast.error('Item removed from Like!');
            } else {
                // Add to Like
                await axiosInstance.post('/api/add-like', likeForm);
                setLikedItems(prevItems => [...prevItems, id]);
                dispatch({ type: 'ADD_TO_LIKE', payload: { product_id: id } });
                toast.success('Item added to Like!');
            }
        } catch (error) {
            console.error('Error updating Like:', error);
            toast.error('An error occurred while updating the Like.');
        }
    };

    return (
        <Button
            onClick={handleButtonClick}
            variant="destructive"
            className={`flex items-center gap-2 ${likedItems.includes(id) ? 'bg-pink-600' : 'bg-red-600'}`}
        >
            {likedItems.includes(id) ? <FaGrinHearts /> : <FaHandHoldingHeart />}
            {likedItems.includes(id) ? "Loved" : "Favorites"}
        </Button>
    );
};


export const AddLikeBento = ({
    productId,
    productTitle,
    codedescription,
    price,
    projectImages = [] // Use an empty array as default
}) => {
    const { dispatch } = useLike();
    const [likedItems, setLikedItems] = useState([]);
    const [liked, setLiked] = useState(false);
    const userId = Cookies.get("userId");

    const likeForm = {
        productTitle: productTitle,
        price: price,
        user_id: userId,
        product_id: productId,
        projectImages: projectImages,
        codeDescription: codedescription,
    };

    useEffect(() => {
        const fetchLikeItems = async () => {
            if (userId) {
                try {
                    const response = await axiosInstance.get('/api/user-like', { params: { user_id: userId } });
                    const userLikeItems = response.data.data.map(item => item.product_id);
                    setLikedItems(userLikeItems);
                    setLiked(userLikeItems.includes(productId)); // Set initial liked state
                    dispatch({ type: 'UPDATE_LIKE_COUNT', payload: response.data.data.length || 0 });
                } catch (error) {
                    console.error('Error fetching like items:', error);
                }
            }
        };

        fetchLikeItems();
    }, [userId, dispatch, productId]);

    const handleButtonClick = async () => {
        if (!userId) {
            toast.error('Please login first!');
            return;
        }

        try {
            if (liked) {
                // Remove from Like
                await axiosInstance.delete('/api/remove-like', { data: likeForm });
                setLikedItems(prevItems => prevItems.filter(item => item !== productId));
                setLiked(false);
                dispatch({ type: 'REMOVE_FROM_LIKE', payload: { product_id: productId } });
                toast.error('Item removed from Like!');
            } else {
                // Add to Like
                await axiosInstance.post('/api/add-like', likeForm);
                setLikedItems(prevItems => [...prevItems, productId]);
                setLiked(true);
                dispatch({ type: 'ADD_TO_LIKE', payload: { product_id: productId } });
                toast.success('Item added to Like!');
            }
        } catch (error) {
            console.error('Error updating Like:', error);
            toast.error('An error occurred while updating the Like.');
        }
    };

    return (
        <button
            className={`absolute top-[8.3rem] right-9  rounded-full p-1 shadow-md transition duration-200 ${liked ? 'bg-green-100' : 'hover:bg-gray-200'}`}
            onClick={handleButtonClick}
        >
            {liked ? (
                <FaHeart size={17} color="red" />
            ) : (
                <FaHeartBroken size={17} color="red" />
            )}
        </button>
    );
};