
import { useLocation } from 'react-router-dom'

import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'



const CategoriesListPage = () => {

  const heading = "Hot Categories"
  const location = useLocation();
  const { CategoriesToDisplay, userId } = location.state || {}; 


  return (
    <PagesGrid
      data={CategoriesToDisplay}
      heading={heading}
      userId = {userId}
    />


  )
}

export default CategoriesListPage