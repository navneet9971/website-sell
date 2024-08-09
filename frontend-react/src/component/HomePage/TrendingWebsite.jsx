
import React, { useState } from 'react'
import { TrendingData } from '../../data/data';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingWebsite = ({ userId, websiteproductData }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
  const heading = "Trending Website"

  const handleShowTrending = () => {
    setShowAll(true);
    navigate('/homepagedata/trendingWebsiteList', { 
      state: { websiteproductData, userId } 
    });
  }

  return (
    <div>
       <PagesGrid 
       data={websiteproductData} 
       showAll={showAll}
       heading={heading}
       onClick={handleShowTrending}
       userId={userId}
       />
    </div>
  )
}

export default TrendingWebsite