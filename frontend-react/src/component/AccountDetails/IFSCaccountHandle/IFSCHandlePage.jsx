import React from 'react';

const IFSCHandlePage = ({ handleIfscCodeChange, handleInputChange, form, loading, error, onSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-6">Account Details</h1>
        <div className="bg-gray-200 p-6 flex flex-col gap-6">
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                IFSC Code:
              </label>
              <input
                type="text"
                id="ifscCode"
                value={form.ifscCode}
                onChange={handleIfscCodeChange}
                maxLength={11}
                placeholder="Enter IFSC Code"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {form.bankName && (
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                    Bank Name:
                  </label>
                  <input type="text" value={form.bankName} readOnly className="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                    Branch Name:
                  </label>
                  <input type="text" value={form.branchName} readOnly className="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                    District:
                  </label>
                  <input type="text" value={form.district} readOnly className="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City:
                  </label>
                  <input type="text" value={form.city} readOnly className="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address:
                  </label>
                  <input type="text" value={form.address} readOnly className="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State:
                  </label>
                  <input type="text" value={form.state} readOnly className="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
                    Account Holder Name:
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={form.accountHolderName}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                    Account Number:
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={form.accountNumber}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IFSCHandlePage;
