import React from 'react';
import { useLocation } from 'react-router-dom';
import PagesGrid from '../../../globalComponent/PagesGrid';
import Cookies from 'js-cookie';

const TrendingCodesDetailPage = () => {
  const userId = Cookies.get("userId")
  const location = useLocation();
  const {
    codesproductData = [],
    productData = [],
    // userId = [],
    category = "Unknown",
    header = ""
  } = location.state || {};


  // Combine the two arrays into one
  const combinedData = [...codesproductData, ...productData];
  // Determine what to show in the header
  const combinedHeader = header ? header : `${category}  ${header}`;

  
  return (
    <PagesGrid
      data={combinedData}
      showAll={true}
      heading={combinedHeader}
      userId={userId}
    />
  );
};

export default TrendingCodesDetailPage;
