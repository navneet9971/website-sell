import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid';
import { TrendingData } from '@/data/data';
import GridData from '../../globalcomponents/GridData';

const TrendingWebsite = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const heading = "Trending Website"

  const handleShowTrending = () => {
    router.push('/homepagedata/trendingWebsiteList')
    setShowAll(true);
  }

  return (
    <div>
       <GridData data={TrendingData} 
       showAll={showAll} 
       heading={heading}
       onClick={handleShowTrending}
       />
    </div>
  )
}

export default TrendingWebsite