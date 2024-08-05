
import { useAuth } from '@clerk/clerk-react'
import { CategoriesData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React from 'react'

const CategoriesListPage = () => {

  const heading = "Hot Categories"
  const { userId } =  useAuth();

  return (
    <PagesGrid
      data={CategoriesData}
      heading={heading}
      userId = {userId}
    />


  )
}

export default CategoriesListPage