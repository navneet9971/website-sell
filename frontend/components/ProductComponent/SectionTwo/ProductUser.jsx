"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import React from 'react'
import { FaUserSecret, FaHandshake  } from "react-icons/fa";

const ProductUser = () => {

    const hanldeHireDev = () => {
        alert("Please Hire Mee")
    }

  return (
    <div className='w-3/4 h-full border-black bg-slate-200 '>
 <h1 className='bg-blue-400 text-white folnt-bold text-2xl text-center'>Developer</h1>

<div className='flex flex-col items-center justify-center mt-8 gap-3'>
<Avatar className="w-20 h-20">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>Username</AvatarFallback>
</Avatar>
<h2 className="font-bold text-md">Username</h2>
<FaUserSecret  size={25} onClick={hanldeHireDev} className="cursor-pointer"/>


<Button variant="destructive" className="flex items-center gap-2">
    <FaHandshake  size={20} />
    Negotiate Price
</Button>

<Button variant="jump" >
    <FaHandshake  size={20} />
    Request Code Simple
</Button>

<Button variant="jump" > 
    <FaHandshake  size={20} />
    Seller Support
</Button>

<Button variant="jump" >
    <FaHandshake  size={20} />
    Help desk
</Button>

<h1 className="text-sm">User Uploaded Date</h1>



    </div> 

    </div>
  )
}

export default ProductUser