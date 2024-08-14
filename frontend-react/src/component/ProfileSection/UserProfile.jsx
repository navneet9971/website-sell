import React, { useEffect, useState } from 'react';
import UserProfilePage from './UserProfilePage';
import axiosInstance from '../../interceptor/axiosInstance';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const location = useLocation();
  const userData = location.state?.data;

  const [formData, setFormData] = useState({
    bio: '',
    email: '',
    city: '',
    country: '',
    address: '',
    date_of_birth: '',
    phoneNumber: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    github: '',
    profilePic: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  
  useEffect(() => {
    axiosInstance.get('/api/user-profile')
      .then((response) => {
        setFormData(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
      });
  }, []);

  const handleSubmit = () => {
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
  
    axiosInstance.put('/api/user-profile', formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        toast.success('Profile updated successfully!');
      
      })
      .catch((error) => {
        toast.error('There was an error updating the profile!');
        console.error("There was an error updating the profile!", error);
      });
  };
  

  return (
    <UserProfilePage
      userData={userData}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
    
    />
  );
};

export default UserProfile;
