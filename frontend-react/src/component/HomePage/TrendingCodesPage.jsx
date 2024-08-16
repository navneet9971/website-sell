import React, { useState } from 'react';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingCodesPage = ({ userId, codesproductData = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();


  const groupedData = codesproductData.reduce((acc, item) => {
    const category = item.chooseUpload || "Codes";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const handleShowCoding = (category) => {
    setShowAll(true);

    console.log('Navigating to:', groupedData[category], category);
    navigate('/homepagedata/trendingcodes', { 
      state: { 
        codesproductData: groupedData[category], 
        userId,
        category 
      } 
    });
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
