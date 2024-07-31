"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { miniNavbar } from '/data/data';

const SecondNavbar = ({ currentScreen }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <header className="bg-gray-600 shadow fixed top-12 left-0 right-0 z-40">
      <div className="flex items-center justify-start gap-20 mx-auto max-w-7xl h-6 px-4 py-5 sm:px-6 lg:px-8">
        {miniNavbar.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer font-bold ${router.pathname === option.path ? 'text-blue-500' : 'text-white'}`}
            onClick={() => handleNavigation(option.path)}
          >
            <h1>{option.name}</h1>
          </div>
        ))}
      </div>
    </header>
  );
};

export default SecondNavbar;
