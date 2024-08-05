"use client"

import React from 'react'
import { Categories } from '../HomePage/Categories'
import TrendingWebsite from '../HomePage/TrendingWebsite'
import TrendingCodesPage from '../HomePage/TrendingCodesPage'
import { useAuth } from '@clerk/clerk-react'


const ExplorePage = () => {
  const { userId } =  useAuth();
  return (
    <div className='flex flex-col items-center justify-center gap-7' >
      <Categories
        userId={userId}
      />
      <TrendingWebsite
        userId={userId}
      />
      <TrendingCodesPage
        userId={userId}
      />
    </div>
  )
}

export default ExplorePage