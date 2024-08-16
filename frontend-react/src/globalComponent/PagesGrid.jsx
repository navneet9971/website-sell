import { useEffect, useState, useMemo } from 'react';
import { BentoGrid, BentoGridItem } from '../component/ui/BentoGrid';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../interceptor/axiosInstance';

const PagesGrid = ({ data, heading, userId, showAll = true, onClick }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState({});
  const fetchedProductIds = useMemo(() => new Set(), []); // Track fetched reviews
  
  
  const dataToDisplay = useMemo(() => {
    return showAll ? data : data.slice(0, 8);
  }, [data, showAll]);

  const handleCardClick = (item) => {
    navigate(`/productInfo/${item._id}`);
    console.log(item._id);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = { ...reviews }; // Start with existing reviews

      try {
        const requests = dataToDisplay
          .filter(item => !fetchedProductIds.has(item._id)) // Only fetch if not already fetched
          .map(async (item) => {
            const response = await axiosInstance(`/api/review-get?productId=${item._id}`);
            fetchedProductIds.add(item._id); 
            reviewsData[item._id] = response.data;
          });

        await Promise.all(requests);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (dataToDisplay.length > 0) {
      fetchReviews();
    }
  }, [dataToDisplay, fetchedProductIds]);


  const sortedItems = useMemo(() => {
    return dataToDisplay.sort((a, b) => {
      const ratingA = reviews[a._id]?.overallRating || 0;
      const ratingB = reviews[b._id]?.overallRating || 0;
      return ratingB - ratingA;
    });
  }, [dataToDisplay, reviews]);

  
  return (
    <div className='px-6 '>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4'>{heading}</h1>
        {!showAll && onClick && (
          <h3 className='cursor-pointer' onClick={onClick}>Show more</h3>
        )}
      </div>
      <BentoGrid className="max-w-full mx-auto md:auto-rows-[32.5rem]">
        {sortedItems.map((item, index) => (
          <BentoGridItem
            key={index}
            title={item.productTitle}
            description={item.codeDescription}
            language={Array.isArray(item.programmingLanguage) ? item.programmingLanguage.join(', ') : item.programmingLanguage}
            industry={Array.isArray(item.industry) ? item.industry.join(', ') : item.industry}
            devices={Array.isArray(item.devices) ? item.devices.join(', ') : item.devices}
            img={item.projectImages?.[0] || item.img}
            price={item.price}
            userId={userId}
            productId={item._id}
            totalReview={reviews[item._id] || []}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default PagesGrid;
