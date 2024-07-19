import React from 'react'
import ImageSection from './SectionOne/ImagesSection'
import ImageInformation from './SectionOne/ImageInformation'

const ProductInfoPage = () => {
  return (
    <div className="flex items-start justify-between px-10">
    <div className="flex-1">
      <ImageSection />
    </div>
    
    <div className="flex-1">
      <ImageInformation />
    </div>
  </div>
  
  )
}

export default ProductInfoPage