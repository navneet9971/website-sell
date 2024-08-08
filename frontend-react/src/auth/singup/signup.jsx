import React, { useState } from 'react';
import { SignupPage } from './SignUpPage';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../interceptor/axiosInstance';

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignIn = () => {
    navigate('/sign-in/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/signup', formData);
      console.log(response.data);
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  };


  return (
    <SignupPage
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSignIn={handleSignIn}
    />
  );
};

export default Signup;
