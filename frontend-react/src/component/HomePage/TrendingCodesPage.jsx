
import { CodeData } from '../../data/data';
import React, { useState } from 'react'

import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

const TrendingCodesPage = ({userId}) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
  const heading = "Trending Codes";

  const handleShowCoding = () => {
    navigate('/homepagedata/trendingcodes')
    setShowAll(true);
  }


  return (
    <div>
      <PagesGrid
        data={CodeData}
        showAll={false}
        heading={heading}
        onClick={handleShowCoding}
        userId={userId}
      />

    </div>
  )
}

export default TrendingCodesPage