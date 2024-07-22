"use client"

import { LikeGrid, LikeGridItem } from '@/components/ui/LikeGrid';
import { CategoriesData } from '@/data/data';
import React, { useEffect, useState } from 'react'

const ProductLikePage  = () => {

  const [likedItems, setLikedItems] = useState([]);

    useEffect(() => {
        const savedLikedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLikedItems(savedLikedItems);
    }, []);

console.log(likedItems)

  return (
    <div className='px-10 py-2'>
      <h1 className='text-2xl font-bold mb-6'>Favorite Codes</h1>

      <LikeGrid className="max-w-full mx-auto md:auto-rows-[27.5rem]">
        {CategoriesData.map((item) => (
          <LikeGridItem
            key={item.id}
            title={item.title}
            description={item.description}
            language={item.language}
            industry={item.industry}
            devices={item.devices}
            className={item.className}
            img={item.img}
            price={item.price}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </LikeGrid>

<div >


</div>

       </div>
  )
}

export default ProductLikePage 