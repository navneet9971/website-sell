"use client"

import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';

const PagesGrid = ({ data, heading }) => {

    const router = useRouter();


    const handleGridCardClick = (id) => {
        router.push(`mainPage/${id}`);
        console.log(id)
    }

  return (
    <div className='px-6'>
        <h1 className='font-bold text-2xl mb-4'>{heading}</h1>
      <BentoGrid className="max-w-full mx-auto md:auto-rows-[11.5rem]">
        {data.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
            onClick={() => handleGridCardClick(item.id)}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default PagesGrid;
