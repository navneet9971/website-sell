import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { CategoriesData } from '@/data/data'
import React from 'react'

const CategoryList = () => {
  return (
    <div className='px-6'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4' >
        Hot Categories
        </h1>
      </div>

      <BentoGrid className="max-w-full mx-auto md:auto-rows-[11.5rem]">
        {CategoriesData.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>

    </div>
  )
}

export default CategoryList