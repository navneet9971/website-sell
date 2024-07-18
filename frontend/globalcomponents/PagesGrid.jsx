import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';

const PagesGrid = ({ data, heading }) => {
  

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
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default PagesGrid;
