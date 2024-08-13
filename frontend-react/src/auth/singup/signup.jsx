import React, { useState } from 'react';
import { SignupPage } from './SignUpPage';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../interceptor/axiosInstance';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    remember: false,
    profilePic: '',
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePic: files[0],  // Store the actual file object
      }));
    }
  };


  const handleSignIn = () => {
    navigate('/sign-in/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();

    // Append text fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await axiosInstance.post('/api/signup', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      toast.success('Signup successful!');
      navigate('/sign-in/')
    } catch (err) {
      console.error('Error submitting the form:', err);
      toast.error('Error submitting the form. Please try again.');
    }
  };

  return (
    <SignupPage
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSignIn={handleSignIn}
      handleFileChange={handleFileChange}
    />
  );
};

export default Signup;
