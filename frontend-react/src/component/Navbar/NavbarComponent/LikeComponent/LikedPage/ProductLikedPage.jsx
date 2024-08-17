import { useNavigate } from 'react-router-dom';
import { FollowerPointerCard } from '../../../../ui/PointerCard';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { useLike } from '../../../../../globalComponent/LikeContext';
import panda from "../../../../../assets/panda.svg";

const ProductLikePage = () => {
  const userId = Cookies.get("userId");
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const { state, dispatch } = useLike();

  useEffect(() => {
    const fetchLikeItems = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get('/api/user-like', { params: { user_id: userId } });
          setLikedItems(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error('Error fetching liked items:', error);
        } finally {
          setLoading(false); // Stop loading when data is fetched
        }
      }
    };

    fetchLikeItems();
  }, [userId]);

  const removeItem = async (product_id) => {
    try {
      await axiosInstance.delete('/api/remove-like', { data: { product_id, user_id: userId } });
      setLikedItems(prevItems => prevItems.filter(item => item.product_id !== product_id));
      dispatch({ type: 'UPDATE_LIKE_COUNT', payload: state.cartCount - 1 });
      toast.success('Item removed from like!');
    } catch (error) {
      console.error('Error removing item from like:', error);
      toast.error('Failed to remove item from like.');
    }
  };

  const handleCardClick = (item) => {
    navigate(`/productInfo/${item.product_id}`);
    console.log(`Card with id ${item.product_id} clicked`);
  };

  return (
    <div className='px-10 py-2'>
      <h1 className='text-2xl font-bold mb-6'>Favorite Codes</h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-gray-600">Loading your liked items...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {likedItems.map((item) => (
            <div key={item.product_id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <FollowerPointerCard
                title={<TitleComponent title={item.productTitle} avatar={item.projectImages} />}
              >
                <div className="relative overflow-hidden rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
                  <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden relative">
                    <img
                      src={item.projectImages}
                      alt="thumbnail"
                      className="group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 w-full h-[12rem]"
                    />
                  </div>
                  <div className="p-4">
                    <h2 
                    onClick={() => handleCardClick(item)}
                    className="font-bold my-4 text-lg text-zinc-700">
                      {item.productTitle}
                    </h2>
                    <h2 className="font-normal my-4 text-sm text-zinc-500 mt-3 tracking-wide leading-relaxed line-clamp-3">
                      {item.codeDescription}
                    </h2>
                    <div className="flex flex-row justify-between items-center mt-10">
                      <span className="text-2xl font-bold text-gray-500">&#x20B9; {item.price}</span>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="relative z-10 px-6 py-2 bg-red-600 hover:bg-red-400 text-white font-bold rounded-xl text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </FollowerPointerCard>
            </div>
          ))}
        </div>
      )}

      {!loading && likedItems.length === 0 && (
        <div className='flex flex-col items-center justify-center mt-8'>
          <img 
            src={panda}
            width={120}
            height={120}
          />
          <h2 className='text-2xl font-semibold'>You didn't like any product</h2>
          <p className='text-gray-600'>Like a product to see them here.</p>
        </div>
      )}
    </div>
  );
};

const TitleComponent = ({ title, avatar }) => (
  <div className="flex items-center space-x-2 bg-yellow-500 p-1 rounded-xl">
    <img
      src={avatar}
      height="40"
      width="40"
      alt="avatar"
      className="rounded-xl"
    />
    <p className='text-white font-bold'>
      {title.split(' ').slice(0, 1).join(' ')}
    </p>
  </div>
);

export default ProductLikePage;
