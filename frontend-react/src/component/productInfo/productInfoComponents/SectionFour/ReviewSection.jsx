import React, { useEffect, useState } from 'react';
import img from "../../../../assets/anime.jpg";
import axiosInstance from '../../../../interceptor/axiosInstance';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ReviewSection = ({ productId }) => {
    const [reviewData, setReviewData] = useState([]);
    const [totalReview, setTotalReview] = useState([])
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        axiosInstance(`/api/review-get?productId=${productId}`)
            .then((response) => {
                console.log(response.data);
                if (response.data && Array.isArray(response.data.reviews)) {
                    setReviewData(response.data.reviews);
                    setTotalReview(response.data)
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, [productId]);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 8); 
    };

    const latestReview = [...reviewData].reverse();

    return (
        <div>
            <h1 className='text-3xl font-bold'>Customer <span className='text-indigo-600'>Review</span></h1>
            <div className='flex space-x-1 ml-2'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-2xl ${star <= totalReview.overallRating ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                                ★
                            </span>
                        ))}
                        <p className='flex items-center justify-center mt-1'>{totalReview.overallRating} out of 5</p>
                    </div>
            <p className='ml-2'>{totalReview.totalReviews} global ratings</p>
            {latestReview.slice(0, visibleCount).map((review, index) => (
                <div key={index} className='mt-8'>
                 
                    <div className='flex items-center justify-start gap-4'>
                        <LazyLoadImage
                        effect="blur"
                            src={review.user?.profilePic}
                            className="w-12 h-12 rounded-full"
                            alt='review-img'
                        />
                        <p className='font-bold text-xl'>{review.user?.fullName || 'Anonymous'}</p>
                    </div>

                    <div className='flex space-x-1 ml-2'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-2xl ${star <= review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <div className='ml-3'>
                        <p className='text-sm'>
                           {review.timeAgo}
                        </p>

                        <p className='mt-2'>
                            {review.comment || 'No comment provided.'}
                        </p>
                    </div>
                </div>
            ))}

            {reviewData.length > visibleCount && (
                <button 
                    onClick={handleShowMore} 
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                >
                    Show More Reviews
                </button>
            )}
        </div>
    );
}

export default ReviewSection;
