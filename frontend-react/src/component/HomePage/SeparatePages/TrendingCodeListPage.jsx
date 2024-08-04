import { CodeData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'
// import { auth } from "@clerk/nextjs/server";

const TrendingCodeListPage = () => {
const heading = "Trending Codes"

    return (
            <PagesGrid  
            data = {CodeData}
            heading={heading}
            // userId = {userId}
            />
    )
}

export default TrendingCodeListPage