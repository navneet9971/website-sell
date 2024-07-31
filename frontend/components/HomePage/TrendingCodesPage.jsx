"use client"

import { CodeData } from '/data/data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid';
// import GridData from '@/globalcomponents/GridData';
import PagesGrid from '/globalcomponents/PagesGrid';

const TrendingCodesPage = ({userId}) => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const heading = "Trending Codes";

  const handleShowCoding = () => {
    router.push('/homepagedata/trendingcodes')
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