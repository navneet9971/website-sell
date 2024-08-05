"use client";

import React, { useState } from "react";
import SellCodePage from "../SellCodePage";

const SellCode = () => {
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
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    alert("WOrking.....")
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
