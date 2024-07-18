import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { TrendingData } from '@/data/data';

const TrendingWebsite = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const handleShowTrending = () => {
    router.push('/trendingWebsiteList')
  }

  const TrendingToDisplay = showAll ? TrendingData : TrendingData.slice(0, 8);

  return (
    <div>
        <div className='flex items-center justify-between'>
            <h1 className='font-bold text-2xl mb-4' > 
                Trending Website
            </h1>
            {!showAll && (
          <h3 className='cursor-pointer' onClick={handleShowTrending}>Show more</h3>
        )}
        </div>

        <BentoGrid className="max-w-full mx-auto md:auto-rows-[11.5rem]">
        {TrendingToDisplay.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>

    </div>
  )
}

export default TrendingWebsite