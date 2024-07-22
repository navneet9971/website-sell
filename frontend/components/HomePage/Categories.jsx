"use client"

// components/Categories.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GridData from '../../globalcomponents/GridData';
import { CategoriesData } from '@/data/data';

export const Categories = () => {
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
      <GridData
        data={CategoriesToDisplay}
        showAll={showAll}
        heading={heading}
        onClick={handleShowMore}
      />
    </div>
  );
};


