
import React, { useState } from "react";
import SellCodePage from "../SellCodePage";
import useAxiosInstance from "../../../interceptor/axiosInstance";
import { useAuth } from '@clerk/clerk-react';
import axios from "axios";

const SellCode = () => {
  const { sessionId } = useAuth();
  const axiosInstance = useAxiosInstance();
  const { userId } =  useAuth();
  const [formData, setFormData] = useState({
    productTitle: "",
    codeDescription: "",
    tags: [],
    programmingLanguage: [],
    features: [],
    installationInstructions: "",
    adaptationInstructions: "",
    industry: [],
    devices: [],
    livePreview: "",
    videoUrl: "",
    images: [],
    installationGuide: null,
    projectCode: null,
    price: "",
    weeklyFreeCode: false,
    monthlyFreeCode: false,
    termsOfService: "",
    chooseUpload: "",
    user: userId,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/sell',
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionId}`,
          },
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: !prevFormData[name],
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: selectedOptions.map((option) => option.value),
    }));
  };

  const handleTagsChange = (tags) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags,
    }));
  };

  const handleFeaturesChange = (features) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      features,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <SellCodePage
      handleSubmit={handleSubmit}
      formData={formData}
      handleInputChange={handleInputChange}
      handleCheckboxChange={handleCheckboxChange}
      handleFileChange={handleFileChange}
      handleMultiSelectChange={handleMultiSelectChange}
      handleTagsChange={handleTagsChange}
      handleFeaturesChange={handleFeaturesChange}
      handleChange={handleChange}
    />
  );
};

export default SellCode;
