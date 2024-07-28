"use client"

import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';

const PagesGrid = ({ data, heading, userId, showAll = true, onClick }) => {
  const router = useRouter();
  const dataToDisplay = showAll ? data : data.slice(0, 8);

  const handleCardClick = (id) => {
    router.push(`/productInfo/${id}`);
    console.log(id);
  };

  return (
    <div className='px-6'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4'>{heading}</h1>
        {!showAll && onClick && (
          <h3 className='cursor-pointer' onClick={onClick}>Show more</h3>
        )}
      </div>
      <BentoGrid className="max-w-full mx-auto md:auto-rows-[27.5rem]">
        {dataToDisplay.map((item) => (
          <BentoGridItem
            key={item.id}
            title={item.title}
            description={item.description}
            language={item.language}
            industry={item.industry}
            devices={item.devices}
            className={item.className}
            img={item.img}
            price={item.price}
            userId={userId}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default PagesGrid;
