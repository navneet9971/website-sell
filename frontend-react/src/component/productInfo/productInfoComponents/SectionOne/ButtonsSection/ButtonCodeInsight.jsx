import React from 'react'
import { FaFileCode} from "react-icons/fa6";
import { Button } from '../../../../ui/button';

const ButtonCodeInsight = () => {

const handleCodeInsight = () => {
  alert("yes i am also wokring")
}

  return (
    <Button 
    variant="default" 
    className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
    onClick={handleCodeInsight}
    >
    <FaFileCode size={20} />
    Code Insight
</Button>
  )
}

export default ButtonCodeInsight