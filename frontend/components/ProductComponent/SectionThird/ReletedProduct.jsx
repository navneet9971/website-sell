"use client"

import { TrendingData } from '/data/data'
import PagesGrid from '/globalcomponents/PagesGrid'
import React, { useState } from 'react'

const ReletedProduct = () => {
    const [showAll, setShowAll] = useState(false);
    const dataToDisplay = showAll ? TrendingData : TrendingData.slice(0, 4);


    const handleCardClick = (id) => {
        router.push(`/productInfo/${id}`);
        console.log(id);
        setShowAll(false);
      };


  return (
    <div className='flex  flex-col items-start justify-start gap-4'>
        <h1 className='text-3xl font-bold'>Releted  <span className='text-indigo-600'>Products</span></h1>
        <div className='px-10'>
       <PagesGrid 
       data={dataToDisplay} 
       onClick={() => handleCardClick(item.id)}
       />
       </div>
        </div>
  )
}

export default ReletedProduct