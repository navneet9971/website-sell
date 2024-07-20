"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { testData } from "@/data/data";
import dynamic from 'next/dynamic';
import React from 'react'
import { FaUserSecret, FaHandshake } from "react-icons/fa";

// Dynamic import of react-folder-tree with ssr: false
const FolderTree = dynamic(() => import('react-folder-tree'), { ssr: false });

const ProductUser = () => {

  const handleHireDev = () => {
    alert("Please Hire Me")
  }

  return (
    <>
      <div className='w-[27rem] h-full border-black bg-slate-200'>
        <h1 className='bg-blue-400 text-white font-bold text-2xl text-center'>Developer</h1>

        <div className='flex flex-col items-center justify-center mt-8 gap-3'>
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-md">Username</h2>
          <FaUserSecret size={25} onClick={handleHireDev} className="cursor-pointer" />

          <Button variant="destructive" className="flex items-center gap-2">
            <FaHandshake size={20} />
            Negotiate Price
          </Button>

          <Button variant="jump">
            <FaHandshake size={20} />
            Request Code Sample
          </Button>

          <Button variant="jump">
            <FaHandshake size={20} />
            Seller Support
          </Button>

          <Button variant="jump">
            <FaHandshake size={20} />
            Help Desk
          </Button>

          <h1 className="text-sm">User Uploaded Date</h1>
        </div>
      </div>

      <div className="w-[27rem] h-full border-black bg-slate-200 mt-5">
        <h1 className='bg-blue-400 text-white font-bold text-2xl text-center'>File Tree</h1>
        
        <div className="flex items-center justify-start ml-5">
        <FolderTree 
        data={testData}
        showCheckbox={false}     
        showSearch={false}       
        initOpenStatus="closed"      
        readOnly ={true} 
      />
      </div>


      </div>
    </>
  )
}

export default ProductUser