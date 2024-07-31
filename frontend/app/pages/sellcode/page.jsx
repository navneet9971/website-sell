"use client"

import SellCodePage from '/pages/SellCodePage'
import React, { useState } from 'react'

const SellCode = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    languages: [],
    features: [],
    installation: '',
    adaptation: '',
    livePreview: '',
    videoUrl: '',
    images: null,
    installationGuide: null,
    projectCode: null,
    price: '',
    bookDemo: false,
    weeklyFree: false,
    copyright: false,
    qualityGuideline: false,
    paymentInfo: false,
    externalSources: false,
    industry: [],
    devices: [],
    offers: false,
    apply: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
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
    const response = await fetch('/api/sell-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
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
    />
  )
}

export default SellCode