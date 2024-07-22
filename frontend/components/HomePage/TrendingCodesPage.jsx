import { CodeData } from '@/data/data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid';
import GridData from '@/globalcomponents/GridData';

const TrendingCodesPage = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const heading = "Trending Codes";

  const handleShowCoding = () => {
    router.push('/trendingcodes')
    setShowAll(true);
  }


  return (
    <div>
      <GridData
        data={CodeData}
        showAll={showAll}
        heading={heading}
        onClick={handleShowCoding}
      />

    </div>
  )
}

export default TrendingCodesPage