"use client"

import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';

const PagesGrid = ({ data, heading, userId }) => {

    const router = useRouter();
    
    const handleGridCardClick = (id) => {
        router.push(`/productInfo/${id}`);
        console.log(id)
    }

    

  return (
    <div className='px-6'>
        <h1 className='font-bold text-2xl mb-4'>{heading}</h1>
      <BentoGrid className="max-w-full mx-auto md:auto-rows-[27.5rem]">
        {data.map((item, i) => (
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
            onClick={() => handleGridCardClick(item.id)}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default PagesGrid;
