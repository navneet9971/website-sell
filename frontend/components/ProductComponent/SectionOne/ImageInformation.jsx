"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { FaComputer, FaCheck, FaHandHoldingHeart, FaCartPlus  } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";

const languge = [
    { label: 'Python', value: 'Python' },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'Java', value: 'Java' },
    { label: 'C#', value: 'C#' },
    { label: 'Go', value: 'Go' },
]

const use = [
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Content', value: 'Content' },
    { label: 'Media', value: 'Media' },
    { label: 'Food', value: 'Food' },
]

const ImageInformation = () => {

const handleButtonClick = () => {
    alert('Added to cart!')
}

  return (
    <div className='w-full h-full border-black bg-slate-200'>

<h1 className='bg-blue-400 text-white font-bold text-2xl px-4'>Prdouct Information</h1>

<div className='flex items-start justify-around py-3'>
<h1 className='text-3xl font-bold'><span>&#8377;</span>100</h1>
 

<div className='flex items-center justify-center gap-5'>
<Button onClick={handleButtonClick} variant="outline" className="flex items-center gap-2">
<FaCartPlus />
Add cart
</Button>


<Button variant="outline" className="flex items-center gap-2">
<FaHandHoldingHeart  size={20}/>
Favorites 
</Button>
</div>
</div>


<div className='px-3 mt-3'> 
    <div className='flex items-center justify-start gap-2'>
<FaComputer size={20}/>
    <h1 className='font-bold text-sm'>Programming Language</h1>
    </div>

<div className='flex items-center gap-2 mt-2'>
{languge.map((lang) => (
    <div key= {lang.value} className='box-border bg-white shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
    <h1 className=''>{lang.label}</h1>
    </div>
))}
</div>


<div className='flex items-center justify-start gap-2 mt-6'>
<HiBuildingOffice2 size={20}/>
    <h1 className='font-bold text-sm'>Usability</h1>
    </div>

    <div className='flex items-center gap-2 mt-2'>
{use.map((ablity) => (
    <div key= {ablity.value} className='box-border bg-white shadow-lg shadow-indigo-500/25 p-0.5 rounded'>
    <h1 className=''>{ablity.label}</h1>
    </div>
))}
</div>



<div className='flex items-start gap-1 mt-6'>
<FaCheck size={30} color='lightgreen'/>
<h1 className='font-bold text-xl'>Product inspected by Coders</h1>
</div>

</div>



    </div>
  )
}

export default ImageInformation