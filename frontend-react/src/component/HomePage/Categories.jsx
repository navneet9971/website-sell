// components/Categories.js
import { useState } from 'react';
// import GridData from '../../globalcomponents/GridData';
// import { CategoriesData } from '../../data/data';
import PagesGrid from '../../globalComponent/PagesGrid';
import { useNavigate } from 'react-router-dom';

export const Categories = ( {userId, categoriesproductData} ) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
  const heading = "Hot Categories"
  const CategoriesToDisplay = showAll ? categoriesproductData : categoriesproductData.slice(0, 4);

  const handleShowMore = () => {
    setShowAll(true);
    navigate('/homepagedata/categoryList', {
    state: { categoriesproductData, userId } 
    })
  };

  console.log(userId);

  return (
    <div>
      <PagesGrid
        data={CategoriesToDisplay}
        showAll={showAll}
        heading={heading}
        onClick={handleShowMore}
        userId={userId}
      />
    </div>
  );
};


