import { CategoriesData } from '@/data/data'
import PagesGrid from '@/globalcomponents/PagesGrid'
import { auth } from "@clerk/nextjs/server";
import React from 'react'

const CategoryList = () => {

  const heading = "Hot Categories"
const { userId } = auth();


  return (
    <PagesGrid
      data={CategoriesData}
      heading={heading}
      userId = {userId}
    />


  )
}

export default CategoryList