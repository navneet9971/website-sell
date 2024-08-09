import React, { useState } from 'react';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingCodesPage = ({ userId, codesproductData = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const heading = "Trending Codes";


  const codefilteredData = codesproductData?.filter(item => item.chooseUpload === "piececode") || [];

  const handleShowCoding = () => {
    setShowAll(true);
    navigate('/homepagedata/trendingcodes', { 
           state: { codesproductData: codefilteredData, userId } 
    });
  };

  return (
    <div>
      <PagesGrid
        data={codefilteredData}
        showAll={showAll} 
        heading={heading}
        onClick={handleShowCoding}
        userId={userId}
      />
    </div>
  );
};

export default TrendingCodesPage;
