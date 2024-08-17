import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageSection = ({ productImages }) => {


  // Display the first image in the `productImages` array
  const displayImage = productImages[0];

  return (
    <div className='flex flex-col items-center justify-center'>
      <LazyLoadImage
      effect="blur"
        src={displayImage}
        width={600}
        height={350}
        alt="Displayed"
      />
      
<div className='flex items-center justify-around gap-8 mt-4'>
        {productImages.slice(-2).map((url, index) => ( // Display only the last 2 images
          <div key={index}>
            <LazyLoadImage
            effect="blur"
              src={url}
              alt={`Image ${index}`}
              width={270}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
