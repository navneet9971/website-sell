import React from 'react'
import { Button } from '../../../../ui/button';
import { FaBookBookmark } from "react-icons/fa6";

const ButtonUserGuid = () => {

const handleUsergudie = () => {
    alert("working")
}

  return (
    <Button 
    variant="default" 
    className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
    onClick= {handleUsergudie}
    >
    <FaBookBookmark size={20} />
    User Guide
</Button>
  )
}

export default ButtonUserGuid