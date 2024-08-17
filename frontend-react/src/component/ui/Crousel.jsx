import React, { useState, useEffect, useRef } from 'react';

const CustomCarousel = ({ children, itemsPerSlide = 4 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div className="w-1/4 flex-shrink-0" key={index}>
            {child}
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={goToPrevious}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CustomCarousel;
