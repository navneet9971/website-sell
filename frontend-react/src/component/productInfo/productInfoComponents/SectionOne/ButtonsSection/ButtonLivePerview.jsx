import React from 'react';
import { FaPlay } from "react-icons/fa6";
import { Button } from '../../../../ui/button';

const ButtonLivePerview = ({ productInfo }) => {

  const handleLivePerview = () => {
    // Open the livePreview URL in a new tab
    window.open(productInfo.livePreview, '_blank');
  }

  return (
    <Button 
      variant="default" 
      className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
      onClick={handleLivePerview}
    >
      <FaPlay size={20} />
      Live Preview
    </Button>
  )
}

export default ButtonLivePerview;
