
import React, { useState } from 'react'
import { TrendingData } from '../../data/data';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingWebsite = ({ userId }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
  const heading = "Trending Website"

  const handleShowTrending = () => {
    navigate('/homepagedata/trendingWebsiteList')
    setShowAll(true);
  }

  return (
    <div>
       <PagesGrid data={TrendingData} 
       showAll={false}
       heading={heading}
       onClick={handleShowTrending}
       userId={userId}
       />
    </div>
  )
}

export default TrendingWebsite