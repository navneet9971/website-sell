import React  from 'react';
import IFSCHandle from './IFSCaccountHandle/IfscHandle';



export const AccountDetailsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-2 mb-3">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg">
        <h1 className='text-center text-2xl mb-5'>Account Details</h1>
        <div className="bg-gray-200 p-6 flex flex-col gap-2">
          <div className="flex gap-2 mb-4">    
          </div>
           <IFSCHandle />
        </div>
      </div>
    </div>
  );
};
