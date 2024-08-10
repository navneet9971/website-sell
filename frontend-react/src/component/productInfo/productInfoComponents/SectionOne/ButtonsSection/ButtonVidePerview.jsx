import React from 'react'
import { Button } from '../../../../ui/button';
import { FaBookBookmark } from "react-icons/fa6";

const ButtonVidePerview = ({ productInfo }) => {

const handleVideoPerview = () => {
   window.open(productInfo.videoUrl, '_blank');
}

  return (
    <Button 
    variant="default" 
    className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
    onClick= {handleVideoPerview}
    >
    <FaBookBookmark size={20} />
    Video Perview
</Button>
  )
}

export default ButtonVidePerview