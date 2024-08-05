import { useNavigate } from 'react-router-dom';
import { TrendingData } from '../../../../data/data'
import PagesGrid from '../../../../globalComponent/PagesGrid'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react';

const ReletedProduct = ({ id }) => {
    const [showAll, setShowAll] = useState(false);
    const dataToDisplay = showAll ? TrendingData : TrendingData.slice(0, 4);
    const navigate = useNavigate();
    const { userId } =  useAuth();

    const handleCardClick = (id) => {
       navigate(`/productInfo/${id}`);
        console.log(id);
        setShowAll(false);
      };


  return (
    <div className='flex  flex-col items-start justify-start gap-4'>
        <h1 className='text-3xl font-bold'>Releted  <span className='text-indigo-600'>Products</span></h1>
        <div className='px-10'>
       <PagesGrid 
       data={dataToDisplay} 
       onClick={() => handleCardClick(id)}
       user={userId}
       />
       </div>
        </div>
  )
}

export default ReletedProduct