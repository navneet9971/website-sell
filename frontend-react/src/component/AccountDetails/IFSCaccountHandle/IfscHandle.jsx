import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axiosInstance from '../../../interceptor/axiosInstance';
import IfscAccountPage from './IFSCHandlePage';

const IFSCHandle = () => {
  const [form, setForm] = useState({
    ifscCode: '',
    bankName: '',
    branchName: '',
    district: '',
    city: '',
    address: '',
    accountHolderName: '',
    accountNumber: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const fetchBankDetails = async (code) => {
    try {
      setLoading(true);
      setError('');
      const response = await axiosInstance.get(`/api/banks/${code}`);
      setForm((prevForm) => ({
        ...prevForm,
        bankName: response.data.BANK,
        branchName: response.data.BRANCH,
        district: response.data.DISTRICT,
        city: response.data.CITY,
        address: response.data.ADDRESS,
        state: response.data.STATE,
      }));
    } catch (err) {
      setError('Error fetching bank details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchBankDetails = useCallback(debounce(fetchBankDetails, 500), []);

  const handleIfscCodeChange = (e) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      ifscCode: value,
    }));
    
    if (value.length === 11) {
      debouncedFetchBankDetails(value);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        bankName: '',
        branchName: '',
        district: '',
        city: '',
        address: '',
        state: '',
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const response = await axiosInstance.post('/api/submit-account', form);
      setSubmitSuccess('Form submitted successfully!');
    } catch (err) {
      setSubmitError('Error submitting form.');
      console.error(err);
    }
  };

  return (
    <div>
      <IfscAccountPage
        handleIfscCodeChange={handleIfscCodeChange}
        handleInputChange={handleInputChange}
        form={form}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}  
      />
      {submitSuccess && <p style={{ color: 'green' }}>{submitSuccess}</p>}
      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
    </div>
  );
};

export default IFSCHandle;
