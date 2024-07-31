import { cn } from "/lib/utils";
import { Button } from "/components/ui/button";
import Image from "next/image";
import { LiaFileCodeSolid, LiaIndustrySolid } from "react-icons/lia";
import { MdDevices } from "react-icons/md";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import useCountNum from "/globalcomponents/useCountNum";

export const LikeGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const LikeGridItem = ({
  key, // Id of Product
  className,
  title,
  description,
  language,
  industry,
  devices,
  img,
  onClick,
  price,
}) => {

  const [liked, setLiked] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const { increaseLikeCount, decreaseLikeCount } = useCountNum();

  const priceNumber = parseFloat(price);

  const truncateNames = (names) => {
    if (names.length <= 4) {
      return names.join(', ');
    }
    return `${names.slice(0, 4).join(', ')}...`;
  };

  const languageNames = language ? language.split(',').map(name => name.trim()) : [];
  const industryNames = industry ? industry.split(',').map(name => name.trim()) : [];
  const deviceNames = devices ? devices.split(',').map(name => name.trim()) : [];


  const handleBuyItem = () => {
    alert("Working on it hold on plzzzz");
  };


  return (
    <div
      className={cn(
        "w-72 h-[26.5rem] overflow-hidden row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-gray-100 border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="relative">
        <Image
          src={img}
          width={300}
          height={50}
          alt="Bento Item"
          className="object-cover"
        />


        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-sans text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-3 mt-2 cursor-pointer hover:text-neutral-400" onClick={onClick}>
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mb-3 line-clamp-2 cursor-default">
            {description}
          </div>

          <div className="flex flex-col items-start justify-center gap-2 mt-4 cursor-default">
            <div className="flex items-start justify-start gap-1">
              <LiaFileCodeSolid size={22} color="blue" />
              <h1 className="text-xs font-bold text-end py-1">{truncateNames(languageNames)}</h1>
            </div>

            <div className="flex items-start justify-start gap-1">
              <LiaIndustrySolid size={22} color="blue" />
              <h1 className="text-xs font-bold text-end py-1">{truncateNames(industryNames)}</h1>
            </div>

            <div className="flex items-start justify-start gap-1">
              <MdDevices size={22} color="blue" />
              <h1 className="text-xs font-bold text-end py-1">{truncateNames(deviceNames)}</h1>
            </div>
          </div>

          <div className="flex justify-between items-center mt-7">
            <Button
              variant="outline"
              className="w-24 h-10 bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleBuyItem}
            >
              {priceNumber === 0 ? 'Free' : 'Buy'}
            </Button>
            <div className="text-neutral-800 font-bold text-2xl dark:text-neutral-300 cursor-default">
              &#8377; {price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
