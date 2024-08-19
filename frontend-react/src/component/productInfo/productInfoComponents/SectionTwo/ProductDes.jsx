import React from 'react'
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const ProductDes = ({ description, appwork, features, tags, appUse, userName }) => {

  
  const handleMedia = () => {
    alert("Chal raha hu bhai chill kar")
  }

  const formatTag = (tag) => {
    // Trim spaces and capitalize the first letter
    const trimmedTag = tag.trim();
    return trimmedTag.charAt(0).toUpperCase() + trimmedTag.slice(1).toLowerCase();
  };

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
        {/* {des.map((item, index) => ( */}
          <div  className='p-2 min-h-[29.5rem] text-md text-gray-700'>
            <div className='break-words w-[50rem]'>{description}</div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
              <h1 className='text-xl font-bold'>How Does App work</h1>
              <ul>
      {appUse.map((appUse, index) => (
        <li className='break-words w-[50rem]' key={index}>- {appUse}</li>
      ))}
    </ul>
            </div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
              <h1 className='text-xl font-bold'>WHAT DO I NEED TO GET STARTED</h1>
              <h1 className="text-md break-words w-[50rem]">{appwork}</h1>
            </div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
              <h1 className='text-xl font-bold'>Feature</h1>
              <ul>
      {features.map((feature, index) => (
        <li className='break-words w-[50rem]' key={index}>- {feature}</li>
      ))}
    </ul>
            </div>

            <div className='flex flex-col items-start justify-start mt-3 gap-2'>
    <h1 className='text-xl font-bold'>Tags</h1>

    {Array.isArray(tags) && tags.length > 0 ? (
        <div className='flex flex-wrap items-center gap-2'>
            {tags.map((tag, index) => (
                <span key={index} className='bg-white text-xs font-semibold shadow-lg shadow-indigo-500/25 p-1 rounded'>
                    {formatTag(tag)}
                    {index < tags.length - 1 && ', '}
                </span>
            ))}
        </div>
    ) : (
        <p>No tags available</p>
    )}
</div>

          </div>
        {/* ))} */}
      </div>

      <div className='flex flex-col items-start px-2 gap-2'>
        <h1 className='font-bold text-sm'>Have questions, please contact my Info:</h1>
        <h1 className='font-bold text-md'>Username: {userName}</h1>
      </div>
    </div>
  )
}

export default ProductDes
