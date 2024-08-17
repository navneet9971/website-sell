import React, { useState, useRef, useEffect } from 'react';
import { miniNavbar } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import { useProductData } from '../../globalComponent/SellDataContext';

const SecondNavbar = () => {
  const navigate = useNavigate();
  const { productData } = useProductData();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const limit = 3;

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleCodePage = (chooseUpload) => {
    const filteredData = productData.filter(product => product.chooseUpload === chooseUpload);
    navigate(`/homepagedata/trendingcodes`, {
      state: { productData: filteredData, header: chooseUpload }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-600 shadow fixed top-12 left-0 right-0 z-40">
      <div className="flex items-center justify-start gap-20 mx-auto max-w-7xl h-6 px-4 py-5 sm:px-6 lg:px-8">
        {miniNavbar.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer font-bold ${
              window.location.pathname === option.path ? 'text-blue-500' : 'text-white'
            }`}
            onClick={() => handleNavigation(option.path)}
          >
            <h1>{option.name}</h1>
          </div>
        ))}
        <div className="flex gap-20 relative">
          {productData.slice(0, limit).map((product, index) => (
            <div
              key={index}
              className={`cursor-pointer font-bold ${
                window.location.pathname.includes(product.chooseUpload.toLowerCase().replace(/\s/g, '')) ? 'text-blue-500' : 'text-white'
              }`}
              onClick={() => handleCodePage(product.chooseUpload)}
            >
              {product.chooseUpload}
            </div>
          ))}
          {productData.length > limit && (
            <div className="relative" ref={dropdownRef}>
              <div
                className="cursor-pointer font-bold text-white"
                onClick={toggleDropdown}
              >
                Show more
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-500 rounded shadow-lg z-50">
                  {productData.slice(limit).map((product, index) => (
                    <div
                      key={index + limit}
                      className={`cursor-pointer px-4 py-2 text-sm font-bold text-white hover:bg-gray-600 ${
                        window.location.pathname.includes(product.chooseUpload.toLowerCase().replace(/\s/g, '')) ? 'text-blue-500' : ''
                      }`}
                      onClick={() => {
                        handleCodePage(product.chooseUpload);
                        setDropdownOpen(false); 
                      }}
                    >
                      {product.chooseUpload}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SecondNavbar;
