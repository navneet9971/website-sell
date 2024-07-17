import React from 'react';
import { miniNavbar } from '@/data/data';

const SecondNavbar = ({ currentScreen, setCurrentScreen }) => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-start gap-20 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {miniNavbar.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer font-bold ${currentScreen === option.name.toLowerCase() ? 'text-blue-500' : ''}`}
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
