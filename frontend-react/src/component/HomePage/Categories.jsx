// components/Categories.js
import { useState } from 'react';
// import GridData from '../../globalcomponents/GridData';
import { CategoriesData } from '../../data/data';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

export const Categories = ( {userId} ) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
  const heading = "Hot Categories"
  const CategoriesToDisplay = showAll ? CategoriesData : CategoriesData.slice(0, 4);

  const handleShowMore = () => {
    navigate('/homepagedata/categoryList');
    setShowAll(true);
  };

  console.log(userId);

  return (
    <div>
      <PagesGrid
        data={CategoriesToDisplay}
        showAll={false}
        heading={heading}
        onClick={handleShowMore}
        userId={userId}
      />
    </div>
  );
};


