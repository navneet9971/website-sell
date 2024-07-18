import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { TrendingData } from '@/data/data'
import PagesGrid from '@/globalcomponents/PagesGrid'
import React from 'react'

const TrendingCodes = () => {
    const heading = "Trending Website"
    return (
   
<PagesGrid 
data={TrendingData}
heading={heading}
/>

    )
}

export default TrendingCodes