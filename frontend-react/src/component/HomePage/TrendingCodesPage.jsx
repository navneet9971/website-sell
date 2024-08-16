import React, { useState } from 'react';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingCodesPage = ({ userId, codesproductData = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Group data by `chooseUpload`
  const groupedData = codesproductData.reduce((acc, item) => {
    const category = item.chooseUpload || "Unknown";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const handleShowCoding = () => {
    setShowAll(true);
    navigate('/homepagedata/trendingcodes', { 
      state: { codesproductData, userId } 
    });
  };

  return (
    <div>
      {Object.keys(groupedData).map(category => (
        <div className = "mt-20" key={category}>
          <PagesGrid
            data={groupedData[category]}
            showAll={showAll}
            heading={category} 
            onClick={handleShowCoding}
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
};

export default TrendingCodesPage;
