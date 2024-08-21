import React, { useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';

const BankDetails = () => {
  const [ifscCode, setIfscCode] = useState('');
  const [bankDetails, setBankDetails] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  // Handle IFSC code submission
  const handleIfscSubmit = (event) => {
    event.preventDefault();

    axiosInstance.get(`/api/banks/${ifscCode}`)
      .then(response => {
        setBankDetails(response.data);
        setBranches(response.data.branches || []);
      })
      .catch(err => console.error(err));
  };

  // Handle branch selection
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <div>
      <h2>Bank and Branch Details</h2>
      <form onSubmit={handleIfscSubmit}>
        <label>IFSC Code:</label>
        <input 
          type="text" 
          value={ifscCode} 
          onChange={(e) => setIfscCode(e.target.value)} 
          placeholder="Enter IFSC Code"
        />
        <button type="submit">Fetch Details</button>
      </form>

      {bankDetails && (
        <div>
          <h3>Bank Details</h3>
          <p><strong>Bank Name:</strong> {bankDetails.name}</p>
          <p><strong>Bank Code:</strong> {bankDetails.code}</p>
          <label>Branch:</label>
          <select value={selectedBranch} onChange={handleBranchChange}>
            <option value="">Select a branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
