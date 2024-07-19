"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

const ImageInformation = () => {

const handleButtonClick = () => {
    alert('Added to cart!')
}

  return (
    <div className='w-full h-full border-black bg-slate-200'>

<h1 className='bg-blue-400 text-white font-bold text-2xl px-4'>Prdouct Information</h1>

<div className='flex items-start justify-around py-3'>
<h1 className='text-4xl font-bold'><span>&#8377;</span>100</h1>
 

<div className='flex items-center justify-center gap-5'>
<Button onClick={handleButtonClick} variant="outline">
Add cart
</Button>
<Button variant="outline">
Favorites
</Button>
</div>
</div>


<div> 
    <h1>Programming Language</h1>
</div>

    </div>
  )
}

export default ImageInformation