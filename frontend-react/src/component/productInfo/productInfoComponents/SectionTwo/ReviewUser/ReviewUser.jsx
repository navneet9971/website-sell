import React, { useState } from 'react';
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const ReviewUser = ({ productId }) => {
  const product_id = productId;
  const [reviewForm, setReviewForm] = useState({
    product_id,
    comment: '',
    rating: 0,
  });

  const handleRating = (rate) => {
    setReviewForm({ ...reviewForm, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/user-review', reviewForm);
      toast.success('Review submitted successfully!'); // Show success toast
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('Please log in first to submit a review.'); // Show login error toast
      } else {
        toast.error('Failed to submit review. Please try again.'); // Show generic error toast
      }
    }
  };

  const handleCommentChange = (e) => {
    setReviewForm({ ...reviewForm, comment: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-center">
          <label htmlFor="comment" className="block text-gray-700 font-semibold">
            Comment:
          </label>
          <textarea
            id="comment"
            className="w-80 p-2 border border-gray-300 rounded-md"
            value={reviewForm.comment}
            onChange={handleCommentChange}
            required
          />
        </div>
        <div className="mb-4 flex flex-col items-center">
          <label className="block text-gray-700 font-semibold">Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${
                  star <= reviewForm.rating ? 'text-yellow-500' : 'text-gray-400'
                }`}
                onClick={() => handleRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewUser;
