import React from 'react';
import { useLocation } from 'react-router-dom';
import PagesGrid from '../../../globalComponent/PagesGrid';

const TrendingCodesDetailPage = () => {
  const location = useLocation();

  console.log('Location state:', location.state);
  const { codesproductData = [], userId, category = "Unknown" } = location.state || {};

  return (
    <div>
    
      <PagesGrid
        data={codesproductData}
        showAll={true} 
        heading={category} 
        userId={userId}
      />
    </div>
  );
};

export default TrendingCodesDetailPage;
