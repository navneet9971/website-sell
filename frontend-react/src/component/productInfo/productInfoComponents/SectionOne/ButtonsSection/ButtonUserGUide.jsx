import React from 'react'
import { FaFileCode } from "react-icons/fa6";
import { Button } from '../../../../ui/button';

const ButtonUserGuide = ({ productInfo }) => {

  const handleUserGuide = () => {
    if (productInfo && productInfo.installationGuide) {
      console.log("Opening PDF:", productInfo.installationGuide);
      window.open(productInfo.installationGuide, '_blank');
    } else {
      console.error("Installation guide URL is not available");
    }
  }

  return (
    <Button 
      variant="default" 
      className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
      onClick={handleUserGuide}
    >
      <FaFileCode size={20} />
      User Guide
    </Button>
  )
}

export default ButtonUserGuide
