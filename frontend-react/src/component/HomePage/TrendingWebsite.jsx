
import React, { useState } from 'react'
import { TrendingData } from '../../data/data';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingWebsite = ({ userId, websiteproductData }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
  const heading = "Trending Website"

  const websitefilteredData = websiteproductData?.filter(item => item.chooseUpload === "fullwebsite") || [];

  const handleShowTrending = () => {
    setShowAll(true);
    navigate('/homepagedata/trendingWebsiteList', { 
      state: { websitefilteredData, userId } 
    });
  }

  return (
    <div>
       <PagesGrid 
       data={websitefilteredData} 
       showAll={showAll}
       heading={heading}
       onClick={handleShowTrending}
       userId={userId}
       />
    </div>
  )
}

export default TrendingWebsite