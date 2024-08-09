
import React, { useState } from "react";
import SellCodePage from "../SellCodePage";
import Cookies from "js-cookie";
import axiosInstance from "../../../interceptor/axiosInstance";

const SellCode = () => {
  const userId  = Cookies.get("userId")
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
    images: "",
    installationGuide: null,
    projectCode: null,
    price: "",
    // weeklyFreeCode: false,
    monthlyFreeCode: false,
    // termsOfService: "",
    chooseUpload: "",
    user: userId,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const form = new FormData();
    
    // Append text fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && key !== 'images' && key !== 'installationGuide' && key !== 'projectCode') {
        form.append(key, formData[key]);
      }
    }
  
    // Append file fields
    for (const fileKey of ['images', 'installationGuide', 'projectCode']) {
      if (formData[fileKey]) {
        for (const file of formData[fileKey]) {
          form.append(fileKey, file);
        }
      }
    }
  
    try {
      const response = await axiosInstance.post('/api/sell', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
