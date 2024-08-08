import React from 'react'
import { Categories } from '../HomePage/Categories'
import TrendingWebsite from '../HomePage/TrendingWebsite'
import TrendingCodesPage from '../HomePage/TrendingCodesPage'
import Cookies from 'js-cookie';

const ExplorePage = () => {
  const userId  = Cookies.get("userId")

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