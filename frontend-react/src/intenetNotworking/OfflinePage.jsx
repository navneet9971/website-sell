// components/OfflinePage.jsx
import React from 'react';
import useOnlineStatus from './useOnlineStatus'; 

const OfflinePage = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">No Internet Connection</h1>
        <p className="text-lg text-gray-700 mb-6">It looks like you're offline. Please check your internet connection and try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default OfflinePage;
