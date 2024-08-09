
import { useLocation } from 'react-router-dom'
import { CategoriesData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React, { useEffect, useState } from 'react'
// import Cookies from 'js-cookie';
// import axiosInstance from "../../../interceptor/axiosInstance"


const CategoriesListPage = () => {

  const heading = "Hot Categories"
  const location = useLocation();
  const { codesproductData, userId } = location.state || {}; // Destructure the data from state


  return (
    <PagesGrid
      data={codesproductData}
      heading={heading}
      userId = {userId}
    />


  )
}

export default CategoriesListPage