"use client"

import React from 'react'
import { Categories } from '../components/HomePage/Categories'
import TrendingWebsite from '../components/HomePage/TrendingWebsite'
import TrendingCodesPage from '../components/HomePage/TrendingCodesPage'


const ExplorePage = ({ userId }) => {
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