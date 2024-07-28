import { TrendingData } from '@/data/data'
import PagesGrid from '@/globalcomponents/PagesGrid'
import React from 'react'
import { auth } from "@clerk/nextjs/server";

const TrendingCodes = () => {
    const heading = "Trending Website"
    const { userId } = auth();


    return (
<PagesGrid 
data={TrendingData}
heading={heading}
userId = {userId}
/>
    )
}

export default TrendingCodes