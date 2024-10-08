
import React from 'react'
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLike } from '../../../../../globalComponent/LikeContext';

const AddLike = () => {
    const navigate = useNavigate();
    const { state } = useLike();
    const { likeCount } = state;

    console.log('Current state:', state);  

    const handleLikePage = () => {
        navigate(`/navbar/likeInfo`);
    }

    return (
        <div className='relative'>
            <button onClick={handleLikePage} className='relative'>
                <FiHeart size={28} className='text-red-600' />
                {likeCount > 0 && (
                    <span className='absolute -top-1.5 -right-2.5 text-white bg-red-500 rounded-full px-1 py-.5 text-xs'>
                        {likeCount}
                    </span>
                )}
            </button>
        </div>
    );
}


export default AddLike