"use client"

// components/Categories.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import GridData from '../../globalcomponents/GridData';
import { CategoriesData } from '@/data/data';
import PagesGrid from '@/globalcomponents/PagesGrid';

export const Categories = ( {userId} ) => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const heading = "Hot Categories"
  const CategoriesToDisplay = showAll ? CategoriesData : CategoriesData.slice(0, 4);

  const handleShowMore = () => {
    router.push('/homepagedata/categoryList');
    setShowAll(true);
  };

  return (
    <div>
      <PagesGrid
        data={CategoriesToDisplay}
        showAll={false}
        heading={heading}
        onClick={handleShowMore}
      />
    </div>
  );
};


