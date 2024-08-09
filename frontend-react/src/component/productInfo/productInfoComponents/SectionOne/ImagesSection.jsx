import React from 'react';

const ImageSection = ({ productImages }) => {


  // Display the first image in the `productImages` array
  const displayImage = productImages[0];

  return (
    <div className='flex flex-col items-center justify-center'>
      <img
        src={displayImage}
        width={600}
        height={100}
        alt="Displayed"
      />
      
<div className='flex items-center justify-around gap-8 mt-4'>
        {productImages.slice(-2).map((url, index) => ( // Display only the last 2 images
          <div key={index}>
            <img
              src={url}
              alt={`Image ${index}`}
              width={230}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
