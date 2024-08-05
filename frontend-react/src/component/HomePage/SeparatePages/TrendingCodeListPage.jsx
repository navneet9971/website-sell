import { useAuth } from '@clerk/clerk-react'
import { CodeData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'
// import { auth } from "@clerk/nextjs/server";

const TrendingCodeListPage = () => {
const heading = "Trending Codes"
const { userId } =  useAuth();
    return (
            <PagesGrid  
            data = {CodeData}
            heading={heading}
            userId = {userId}
            />
    )
}

export default TrendingCodeListPage