import React from 'react';
import { miniNavbar } from '@/data/data';

const SecondNavbar = ({ currentScreen, setCurrentScreen }) => {
  return (
    <header className="bg-gray-600 shadow">
      <div className="flex items-center justify-start gap-20 mx-auto max-w-7xl h-6 px-4 py-5 sm:px-6 lg:px-8">
        {miniNavbar.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer font-bold ${currentScreen === option.name.toLowerCase() ? 'text-blue-500' : 'text-white'}`}
            onClick={() => setCurrentScreen(option.name.toLowerCase())}
          >
            <h1>{option.name}</h1>
          </div>
        ))}
      </div>
    </header>
  );
};

export default SecondNavbar;
