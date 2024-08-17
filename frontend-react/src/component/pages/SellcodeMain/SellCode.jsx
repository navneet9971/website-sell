import React, { useEffect, useState, useMemo, useCallback } from "react";
import SellCodePage from "../SellCodePage";
import Cookies from "js-cookie";
import axiosInstance from "../../../interceptor/axiosInstance";
import throttle from 'lodash/throttle'; // Correct import for lodash throttle
import { toast } from "react-toastify";

const SellCode = () => {
  const userId = Cookies.get("userId");
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
    appUse: [],
    livePreview: "",
    videoUrl: "",
    images: "",
    installationGuide: null,
    projectCode: null,
    price: "",
    monthlyFreeCode: false,
    chooseUpload: "",
    user: userId,
  });

  const [languageOptions, setLanguageOptions] = useState([]);
  const [codeTypes, setCodeType] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [deviceOptions, setDevicesOptions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Throttle API call for languages
  const fetchLanguages = useCallback(throttle(async () => {
    try {
      const response = await axiosInstance.get('/api/languages', {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data && response.data.languages) {
        const languages = response.data.languages;

        const options = languages.flatMap(language => [
          {
            value: language.name,
            label: language.name
          },
          ...language.frameworks.map(framework => ({
            value: framework,
            label: framework
          }))
        ]);

        setLanguageOptions(options);
      }
    } catch (error) {
      console.error('Error fetching programming languages:', error);
    }
  }, 2000), []); // Throttle to 2 seconds

  // Throttle API call for code types, industries, and devices
  const fetchData = useCallback(throttle(async () => {
    try {
      const [codeTypesResponse, industriesResponse, devicesResponse] = await Promise.all([
        axiosInstance.get('/api/code-types'),
        axiosInstance.get('/api/industries'),
        axiosInstance.get('/api/devices'),
      ]);

      if (codeTypesResponse.data) {
        setCodeType(codeTypesResponse.data);
      }
      if (industriesResponse.data) {
        setIndustryOptions(industriesResponse.data);
      }
      if (devicesResponse.data) {
        setDevicesOptions(devicesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 2000), []); // Throttle to 2 seconds

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((event) => {
    const { name } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: !prevFormData[name],
    }));
  }, []);

  const handleFileChange = useCallback((event) => {
    const { name, files } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: files,
    }));
  }, []);

  const handleMultiSelectChange = useCallback((name, selectedOptions) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: selectedOptions.map(option => option.value),
    }));
  }, []);

  const handleTagsChange = useCallback((tags) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tags,
    }));
  }, []);

  const handleFeaturesChange = useCallback((features) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      features,
    }));
  }, []);

  const handleAppUse = useCallback((appUse) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      appUse,
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading screen
  
    const form = new FormData();
    
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && key !== "images" && key !== "installationGuide" && key !== "projectCode") {
        form.append(key, formData[key]);
      }
    }
  
    for (const fileKey of ["images", "installationGuide", "projectCode"]) {
      if (formData[fileKey]) {
        for (const file of formData[fileKey]) {
          form.append(fileKey, file);
        }
      }
    }
  
    form.append("currentDate", new Date().toISOString());
  
    try {
      const response = await axiosInstance.post("/api/sell", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      toast.success("Form submitted successfully!"); 
      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to submit form"}`);
      } else {
        toast.error("Network error. Please try again.");
      }
      console.error("Error submitting form:", error);
    }finally {
      setLoading(false); // Hide loading screen
    }
  }, [formData]);
  
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
      handleChange={handleInputChange} // Reuse handleInputChange for single input change
      handleAppUse={handleAppUse}
      languageOptions={languageOptions}
      codeTypes={codeTypes}
      industryOptions={industryOptions}
      deviceOptions={deviceOptions}
      loading={loading}
    />
  );
};

export default SellCode;
