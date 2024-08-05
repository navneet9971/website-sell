
import { useAuth } from '@clerk/clerk-react'
import { TrendingData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'


const TrendingWebsitePage = () => {
    const heading = "Trending Website"
    const { userId } = useAuth();


    return (
<PagesGrid 
data={TrendingData}
heading={heading}
userId = {userId}
/>
    )
}

export default TrendingWebsitePage