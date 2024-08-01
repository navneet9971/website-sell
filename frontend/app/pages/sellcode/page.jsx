"use client"

import SellCodePage from '/pages/SellCodePage'
import React, { useState } from 'react'

const SellCode = () => {
  const [formData, setFormData] = useState({
    productTitle: '',
    codeDescription: '',
    tags: [],
    programmingLanguage: [],
    features: [],
    chooseUpload:'',
    installationInstructions: '',
    adaptationInstructions: '',
    livePreview: '',
    videoUrl: '',
    industry: [],
    devices: [],
    projectImages: null,
    // installationGuide: null,
    // projectCode: null,
    price: '',


    weeklyFreeCode: '',
    offerOptionBook: '',
    holdcopyRight: '',
    productQulityGuideLine: '',
    copyrightTransfer: '',
    externalSource: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;  // Fixed typo here
    setFormData({ ...formData, [name]: value });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [name]: value });
    } else {
      // Handle the unchecked case if needed, e.g., by removing the entry
      setFormData({ ...formData, [name]: '' });
    }
  };
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData({ ...formData, [name]: selectedOptions.map(option => option.value) });
  };

  const handleTagsChange = (tags) => {
    setFormData({ ...formData, tags });
  };

  const handleFeaturesChange = (features) => {
    setFormData({ ...formData, features });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((value, index) => {
          formDataToSubmit.append(`${key}[${index}]`, value);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    const response = await fetch('http://localhost:4000/api/sell', {
      method: 'POST',
      body: formDataToSubmit
    });
    console.log(formData);

    if (response.ok) {
      alert('Form submitted successfully');
    } else {
      alert('Form submission failed');
    }
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
  )
}

export default SellCode
