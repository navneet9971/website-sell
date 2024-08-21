import React, { useState } from 'react';

export const AccountDetailsPage = ({ handleInputChange }) => {
  const [formData, setFormData] = useState({
    accountName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
  });

  const [selectedOption, setSelectedOption] = useState('ifsc'); // Default to IFSC
  const [isIFSCValid, setIsIFSCValid] = useState(false); // To check if IFSC is valid

  const handleIFSCChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, ifscCode: value });

    if (value.length === 11) { // Assuming IFSC code length is 11
      const bankDetails = await fetchBankDetails(value);
      if (bankDetails) {
        setFormData({
          ...formData,
          bankName: bankDetails.bankName,
          branchName: bankDetails.branchName,
        });
        setIsIFSCValid(true);
      } else {
        setIsIFSCValid(false);
      }
    } else {
      setIsIFSCValid(false);
    }
  };

  const fetchBankDetails = async (ifscCode) => {
    // Replace with actual API request
    // Mock data for demonstration
    return ifscCode === 'VALIDIFSC' ? {
      bankName: 'Mock Bank',
      branchName: 'Mock Branch',
    } : null;
  };

  const handleSubmit = async () => {
    // Replace with actual API request
    // Mock data for demonstration
    const response = await submitFormData(formData);
    if (response.success) {
      alert('Form submitted successfully!');
    } else {
      alert('Failed to submit form.');
    }
  };

  const submitFormData = async (data) => {
    // Replace with actual API request
    // Mock data for demonstration
    return { success: true };
  };

  

  return (
    <div className="flex flex-col items-center justify-center mt-2 mb-3">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg">
        <h1 className='text-center text-2xl mb-5'>Account Details</h1>
        <div className="bg-gray-200 p-6 flex flex-col gap-6">
          {/* Radio buttons for selecting IFSC or UPI ID */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="ifscOption"
                name="selection"
                value="ifsc"
                checked={selectedOption === 'ifsc'}
                onChange={() => setSelectedOption('ifsc')}
                className="mr-2"
              />
              <label htmlFor="ifscOption" className='text-sm font-medium text-gray-700'>IFSC Code</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="upiOption"
                name="selection"
                value="upi"
                checked={selectedOption === 'upi'}
                onChange={() => setSelectedOption('upi')}
                className="mr-2"
              />
              <label htmlFor="upiOption" className='text-sm font-medium text-gray-700'>UPI ID</label>
            </div>
          </div>

          {/* Conditional rendering based on selected option */}
          {selectedOption === 'ifsc' ? (
            <div className="grid grid-cols-2 gap-6">
              <div className='space-y-2'>
                <label htmlFor="ifscCode" className='text-sm font-medium text-gray-700'>
                  IFSC Code
                </label>
                <input
                  id="ifscCode"
                  type="text"
                  value={formData.ifscCode}
                  onChange={handleIFSCChange}
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="bankName" className='text-sm font-medium text-gray-700'>
                  Bank Name
                </label>
                <input
                  id="bankName"
                  type="text"
                  value={formData.bankName}
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  readOnly
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="branchName" className='text-sm font-medium text-gray-700'>
                  Branch Name
                </label>
                <input
                  id="branchName"
                  type="text"
                  value={formData.branchName}
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  readOnly
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="accountName" className='text-sm font-medium text-gray-700'>
                  Account Holder Name
                </label>
                <input
                  id="accountName"
                  type="text"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="accountNumber" className='text-sm font-medium text-gray-700'>
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              <label htmlFor="upiId" className='text-sm font-medium text-gray-700'>
                UPI ID
              </label>
              <input
                id="upiId"
                type="text"
                value={formData.upiId}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          )}
          {selectedOption === 'ifsc' && isIFSCValid && (
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
