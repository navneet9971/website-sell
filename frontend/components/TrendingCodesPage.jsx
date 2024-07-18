import { CodeData } from '@/data/data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';

const TrendingCodesPage = () => {
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
  
    const handleShowCoding = () => {
      router.push('/trendingcodes')
    }
  
    const CodeToDisplay = showAll ? CodeData : CodeData.slice(0, 8);

  return (
    <div>
    <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4' > 
            Trending Codes
        </h1>
        {!showAll && (
      <h3 className='cursor-pointer' onClick={handleShowCoding}>Show more</h3>
    )}
    </div>

    <BentoGrid className="max-w-full mx-auto md:auto-rows-[11.2rem]">
    {CodeToDisplay.map((item, i) => (
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

export default TrendingCodesPage