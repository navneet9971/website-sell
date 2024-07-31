"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid';
import { TrendingData } from '/data/data';
// import GridData from '../../globalcomponents/GridData';
import PagesGrid from '/globalcomponents/PagesGrid';

const TrendingWebsite = ({ userId }) => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const heading = "Trending Website"

  const handleShowTrending = () => {
    router.push('/homepagedata/trendingWebsiteList')
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