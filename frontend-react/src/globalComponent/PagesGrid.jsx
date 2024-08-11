import { BentoGrid, BentoGridItem } from '../component/ui/BentoGrid';
import { useNavigate } from 'react-router-dom';

const PagesGrid = ({ data, heading, userId, showAll = true, onClick }) => {
  const navigate = useNavigate();
  const dataToDisplay = showAll ? data : data.slice(0, 8);

  const handleCardClick = (item) => {
    navigate(`/productInfo/${item._id}`);
    console.log(item._id); 
  };

  console.log(dataToDisplay)

  return (
    <div className='px-6'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4'>{heading}</h1>
        {!showAll && onClick && (
          <h3 className='cursor-pointer' onClick={onClick}>Show more</h3>
        )}
      </div>
      <BentoGrid className="max-w-full mx-auto md:auto-rows-[27.5rem]">
        {dataToDisplay.map((item, index) => (
          <BentoGridItem
            key={index}
            title={item.productTitle}
            description={item.codeDescription}
            language={Array.isArray(item.programmingLanguage) ? item.programmingLanguage.join(', ') : item.programmingLanguage}
            industry={Array.isArray(item.industry) ? item.industry.join(', ') : item.industry}
            devices={Array.isArray(item.devices) ? item.devices.join(', ') : item.devices}
            className={item.className}
            img={item.projectImages?.[0] || item.img}  
            price={item.price}
            userId={userId}
            productId={item._id}
            onClick={() => handleCardClick(item)} 
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default PagesGrid;
