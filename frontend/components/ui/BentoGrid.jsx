import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({ className, children }) => {
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

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  img,
  onClick,
  buttonText,
  price,
}) => {
  return (
    <div
      className={cn(
        "w-72 h-96 overflow-hidden row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-gray-100 border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <Image
        src={img}
        width={300}
        height={50}
        />
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 cursor-pointer" onClick={onClick}>
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={onClick}>
            {buttonText}
          </button>
          <div className="text-neutral-600 dark:text-neutral-300">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
};