import React from 'react'


import Image1 from "/public/anime.jpg";
import Image2 from "/public/dargon.jpg";
import Image3 from "/public/exampleAnime.jpg";
import Image from 'next/image';

const ImageSection = () => {

  const exampleImage = [
    {
      id: 1,
      image: Image1,
      alt: "Anime 1",
    },
    {
      id: 2,
      image: Image2,
      alt: "Anime 2",
    }
  ]

  return (
    <div className='flex flex-col items-center justify-center'>
  <Image
  src={Image3}
  width={600}
  height={100}
/>

<div className='flex items-center justify-around gap-8 mt-4'>
  {exampleImage.map((image) => (
    <div key={image.id}>
      <Image
        src={image.image}
        alt={image.alt}
        width={230}
        height={100}
      />
    </div>
  ))}
 </div>
</div>
  )
}

export default ImageSection