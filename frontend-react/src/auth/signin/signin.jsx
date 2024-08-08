import React, { useState } from 'react'
import { SigningPage } from './SigningPage';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../interceptor/axiosInstance';
import Cookies from "js-cookie";

const Signin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
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

  const handleSignUP = () => {
    navigate('/sign-up/')
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/login', formData);
      Cookies.set("access", response.data.token, { expires: 1 });
  
      const userDataResponse = await axiosInstance.get('/api/profile');
      const userData = userDataResponse.data;
      Cookies.set("userId", userData.user._id)
  
      navigate('/');
  
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  };
  


  return (
    <SigningPage
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSignUP={handleSignUP}
    />
  )
}

export default Signin