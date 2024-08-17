import React, { useState, useMemo } from 'react';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';
import throttle from 'lodash/throttle';

const NAVIGATION_DELAY = 1000;

const TrendingCodesPage = ({ userId, codesproductData = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const groupedData = useMemo(() => 
    codesproductData.reduce((acc, item) => {
      const category = item.chooseUpload || "Codes";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {}), [codesproductData]);

  const throttledNavigate = useMemo(() => 
    throttle((category) => {
      if (!groupedData[category]) return; // null check
      try {
        setShowAll(true);
        navigate('/homepagedata/trendingcodes', { 
          state: { 
            codesproductData: groupedData[category], 
            userId,
            category 
          } 
        });
      } catch (error) {
        console.error(error);
      }
    }, NAVIGATION_DELAY), [navigate, groupedData, userId]);

  const handleShowCoding = (category) => {
    throttledNavigate(category);
  };

  return (
    <div>
      {Object.keys(groupedData).map(category => (
        <div className="mt-3" key={category}>
          <PagesGrid
            data={groupedData[category]}
            showAll={showAll}
            heading={category} 
            onClick={() => handleShowCoding(category)} 
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
};

export default TrendingCodesPage;