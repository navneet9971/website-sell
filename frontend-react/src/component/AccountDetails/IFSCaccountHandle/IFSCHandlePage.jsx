import React from 'react';

const IFSCHandlePage = ({ handleIfscCodeChange, handleInputChange, form, loading, error, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="ifscCode">IFSC Code:</label>
        <input
          type="text"
          id="ifscCode"
          value={form.ifscCode}
          onChange={handleIfscCodeChange}
          maxLength={11}
          placeholder="Enter IFSC Code"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {form.bankName && (
        <div>
          <div>
            <label>Bank Name:</label>
            <input type="text" value={form.bankName} readOnly />
          </div>
          <div>
            <label>Branch Name:</label>
            <input type="text" value={form.branchName} readOnly />
          </div>
          <div>
            <label>District:</label>
            <input type="text" value={form.district} readOnly />
          </div>
          <div>
            <label>City:</label>
            <input type="text" value={form.city} readOnly />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" value={form.address} readOnly />
          </div>
          <div>
            <label>State:</label>
            <input type="text" value={form.state} readOnly />
          </div>
          <div>
            <label>Account Holder Name:</label>
            <input
              type="text"
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default IFSCHandlePage;
