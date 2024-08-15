import React, { useEffect, useState } from "react";
import SellCodePage from "../SellCodePage";
import Cookies from "js-cookie";
import axiosInstance from "../../../interceptor/axiosInstance";
import axios from "axios";

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

  useEffect(() => {
    // Fetch the programming languages from the API
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get('/api/languages', {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // Ensure response data is in the expected format
        if (response.data && response.data.languages) {
          const languages = response.data.languages;

          // Map the fetched data to the format expected by the Select component
          const options = languages.flatMap(language => [
            {
              value: language.name,
              label: language.name
            },
            ...language.frameworks.map(framework => ({
              value: `${language.name} - ${framework}`,
              label: `${framework} `
              // (${language.name})`
            }))
          ]);

          setLanguageOptions(options);
        }
      } catch (error) {
        console.error('Error fetching programming languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  // Fetch code types and store them in state
  useEffect(() => {
    const fetchCodeTypes = async () => {
      try {
        const response = await axiosInstance.get('/api/code-types');

        if (response.data) {
          setCodeType(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching code types:', error);
      }
    };

    fetchCodeTypes();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();

    // Append text fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && key !== "images" && key !== "installationGuide" && key !== "projectCode") {
        form.append(key, formData[key]);
      }
    }

    // Append file fields
    for (const fileKey of ["images", "installationGuide", "projectCode"]) {
      if (formData[fileKey]) {
        for (const file of formData[fileKey]) {
          form.append(fileKey, file);
        }
      }
    }
    // Append current date
    form.append("currentDate", new Date().toISOString());

    try {
      const response = await axiosInstance.post("/api/sell", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
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
    const { name } = event.target;
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

  const handleAppUse = (appUse) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      appUse,
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
      handleAppUse={handleAppUse}
      languageOptions={languageOptions}
      codeTypes={codeTypes}
    />
  );
};

export default SellCode;
