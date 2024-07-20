import React from 'react'
import { Categories } from './Categories'
import TrendingWebsite from './TrendingWebsite'
import TrendingCodesPage from './TrendingCodesPage'

const Explore = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-7' >
    <Categories />
    <TrendingWebsite />
    <TrendingCodesPage />
    </div>
  )
}

export default Explore