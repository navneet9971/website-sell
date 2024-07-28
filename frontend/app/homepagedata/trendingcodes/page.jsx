import { CodeData } from '@/data/data'
import PagesGrid from '@/globalcomponents/PagesGrid'
import React from 'react'
import { auth } from "@clerk/nextjs/server";

const TrendingCodes = () => {
const heading = "Trending Codes"
const { userId } = auth();

const handleShowCoding = () => {
    router.push('/homepagedata/trendingcodes')
    setShowAll(true);
  }

    return (
            <PagesGrid  
            data = {CodeData}
            heading={heading}
            userId = {userId}
            />
    )
}

export default TrendingCodes