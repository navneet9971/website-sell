import { useLocation } from 'react-router-dom';
import PagesGrid from '../../../globalComponent/PagesGrid';
import React from 'react';

const CategoriesListPage = () => {
  const heading = "Hot Categories";
  const location = useLocation();
  const { CategoriesToDisplay, userId } = location.state || {};

  if (!CategoriesToDisplay) {
    // Handle the case where the data is not available, e.g., show an error or a fallback UI
    return <div>No categories available</div>;
  }

  return (
    <PagesGrid
      data={CategoriesToDisplay}
      heading={heading}
      userId={userId}
    />
  );
};

export default CategoriesListPage;
