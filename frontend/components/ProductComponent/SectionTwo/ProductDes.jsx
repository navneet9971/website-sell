"use client"

import React from 'react'
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const ProductDes = () => {

  const des = [
    {
      descr: "Food Recipe app is an iOS platform application which can be used for making application about food recipes. With more than 200 recipes already included in this app, it is a super various content for food lovers, chefs, and cooking experts. This application is fully native, created in the latest Xcode version, support all latest feature of the iOS platform to provide the best user experience. The application is specially optimized, extremely easy to configure, and detailed documentation attached. You can easily create your own application about any food recipes.",
      appwork: "How Does App work",
      applist: `
    - Recipe categories
    - User profile management
    - Shopping list
    - Advanced search functionality
    - Step-by-step cooking instructions
    - Save favorite recipes
    `,
      appstart: "WHAT DO I NEED TO GET STARTED",
      startdes: "To get started with the Food Recipe app, you need a Mac computer with the latest version of Xcode installed. You should have a basic understanding of Swift programming language and iOS app development. Additionally, you will need an Apple Developer account to deploy the app on the App Store.",
      appfeature: "Feature",
      featurework: `
      Comprehensive recipe database
User-friendly interface
Advanced search functionality
Step-by-step cooking instructions
Shopping list integration
Ability to save favorite recipes`
    }
  ];
  
  const handleMedia = () => {
    alert("Chal raha hu bhai chill kar")
  }

  return (
    <div className='w-full h-full border-black bg-slate-200 mb-5'>
      <div className='flex items-center justify-between bg-blue-400'>
        <h1 className=' text-white font-bold text-2xl text-start ml-2'>Product Details</h1>

        <div className='flex items-end justify-end gap-3 mr-2'>
          <FaFacebook size={30} color="blue" className='cursor-pointer' onClick={handleMedia} />
          <FaSquareXTwitter size={30} className='cursor-pointer' onClick={handleMedia} />
          <FaGithub size={30} className='cursor-pointer' onClick={handleMedia} />
        </div>
      </div>

      <div>
        {des.map((item, index) => (
          <div key={index} className='p-2 text-md text-gray-700'>
            <div>{item.descr}</div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
              <h1 className='text-xl font-bold'>{item.appwork}</h1>
              <ul className='text-md'>
                {item.applist.trim().split('\n').filter(line => line.trim().length > 0).map((feature, idx) => (
                  <li key={idx}>{feature.trim()}</li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
              <h1 className='text-xl font-bold'>{item.appstart}</h1>
              <h1 className='text-md'>{item.startdes}</h1>
            </div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
              <h1 className='text-xl font-bold'>{item.appfeature}</h1>
              <ul>
                {item.featurework.trim().split('\n').filter(line => line.trim().length > 0).map((feature, idx) => (
                  <li key={idx}>-{feature.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col items-start px-2 gap-2'>
        <h1 className='font-bold text-sm'>Have questions, please contact my Info:</h1>
        <h1 className='font-bold text-md'>Username</h1>
      </div>
    </div>
  )
}

export default ProductDes
