"use client";

import React, { useState } from 'react';
import SecondNavbar from './SecondNavbar';
import WorkSpace from './WorkSpace';
import Collection from './Collection';
import Explore from './Explore';
import SellCode from './SellCode';
import BuyCode from './BuyCode';

const HomeScreenPage = () => {
  const [currentScreen, setCurrentScreen] = useState('explore');

  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'explore':
        return <Explore />;
      case 'workspace':
        return <WorkSpace />;
      case 'collections':
        return <Collection />;
      case 'sell code':
        return <SellCode />;
      case 'buy code':
        return <BuyCode />;
      default:
        return <div>Select an option from the navbar</div>;
    }
  };

  return (
    <>
      <SecondNavbar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {renderScreenContent()}
        </div>
      </main>
    </>
  );
};

export default HomeScreenPage;
