import { CodeData } from '@/data/data'
import PagesGrid from '@/globalcomponents/PagesGrid'
import React from 'react'

const TrendingCodes = () => {
const heading = "Trending Codes"

    return (
      

            <PagesGrid  
            data = {CodeData}
            heading={heading}
            />


    )
}

export default TrendingCodes