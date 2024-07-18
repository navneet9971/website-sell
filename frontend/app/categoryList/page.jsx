import { CategoriesData } from '@/data/data'
import PagesGrid from '@/globalcomponents/PagesGrid'
import React from 'react'

const CategoryList = () => {

  const heading = "Hot Categories"



  return (
 

      <PagesGrid 
      data={CategoriesData}
      heading={heading}
      />


  )
}

export default CategoryList