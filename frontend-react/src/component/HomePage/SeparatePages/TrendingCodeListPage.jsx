import { useLocation } from 'react-router-dom'
// import { CodeData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'
// import { auth } from "@clerk/nextjs/server";

const TrendingCodeListPage = () => {
const heading = "Trending Codes"
const location = useLocation();
  const { codesproductData, userId } = location.state || {}; // Destructure the data from state

    return (
            <PagesGrid  
            data = {codesproductData}
            heading={heading}
            userId = {userId}
            />
    )
}

export default TrendingCodeListPage