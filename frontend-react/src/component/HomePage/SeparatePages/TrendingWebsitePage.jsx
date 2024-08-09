
// import { useAuth } from '@clerk/clerk-react'
import { useLocation } from 'react-router-dom'
import { TrendingData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'


const TrendingWebsitePage = () => {
    const heading = "Trending Website"
    const location = useLocation();
    const { websiteproductData, userId } = location.state || {}; // Destructure the data from state
  


    return (
<PagesGrid 
data={websiteproductData}
heading={heading}
userId = {userId}
/>
    )
}

export default TrendingWebsitePage