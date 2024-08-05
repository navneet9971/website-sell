import React from 'react'


import Image1 from "../../../../assets/anime.jpg";
import Image2 from "../../../../assets/dargon.jpg";
import Image3 from "../../../../assets/exampleAnime.jpg";


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
  <img
  src={Image3}
  width={600}
  height={100}
  alt="image"
/>

<div className='flex items-center justify-around gap-8 mt-4'>
  {exampleImage.map((image) => (
    <div key={image.id}>
      <img
        src={image.image}
        alt={image.name}
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