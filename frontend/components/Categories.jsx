import React, { useState } from 'react';

import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { CategoriesData } from '@/data/data';
import { useRouter } from 'next/navigation';

export const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const handleShowMore = () => {
    // Redirect to another page to show all categories
    router.push('/categoryList');
  };

  // Determine the number of categories to display
  const categoriesToDisplay = showAll ? CategoriesData : CategoriesData.slice(0, 8);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4'>Hot Categories</h1>
        {!showAll && (
          <h3 className='cursor-pointer' onClick={handleShowMore}>Show more</h3>
        )}
      </div>

      <BentoGrid className="max-w-full mx-auto md:auto-rows-[11.5rem]">
        {categoriesToDisplay.map((item, i) => (
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
  );
};
