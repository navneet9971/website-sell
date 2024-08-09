
import { CategoriesData } from '../../../data/data'
import PagesGrid from '../../../globalComponent/PagesGrid'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axiosInstance from "../../../interceptor/axiosInstance"


const CategoriesListPage = () => {

  const heading = "Hot Categories"
  const userId  = Cookies.get("userId")
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/api/sell`)
        .then((response) => {
            console.log("Response:", response.data);
            setCategoryData(response.data); // Store the data in state
        })
        .catch((error) => {
            console.error("Error fetching category data:", error);
        });
}, []);

  return (
    <PagesGrid
      data={categoryData}
      heading={heading}
      userId = {userId}
    />


  )
}

export default CategoriesListPage