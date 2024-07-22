"use client"

import React from 'react'
import { Categories } from '../components/HomePage/Categories'
import TrendingWebsite from '../components/HomePage/TrendingWebsite'
import TrendingCodesPage from '../components/HomePage/TrendingCodesPage'


const ExplorePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-7' >
    <Categories />
    <TrendingWebsite />
    <TrendingCodesPage />
    </div>
  )
}

export default ExplorePage