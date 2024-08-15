import React, { useState } from 'react';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { deviceOptions, industryOptions, languageOptions } from '../../data/data';

const SellCodePage = ({
  handleSubmit,
  formData,
  handleInputChange,
  handleCheckboxChange,
  handleFileChange,
  handleMultiSelectChange,
  handleTagsChange,
  handleFeaturesChange,
  handleChange,
  handleAppUse
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* <h2 className="text-2xl font-semibold text-gray-700 mb-6">Source Code Details</h2> */}
            {/* Step 1: Source Code Details */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Source Code Product Title</label>
              <input
                type="text"
                name="productTitle"
                value={formData.productTitle}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Source Code Description</label>
              <textarea
                name="codeDescription"
                value={formData.codeDescription}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
            </div>
          
          <div className='flex items-center justify-between'>
                <div className='w-80'>
                  <label className="block text-sm font-medium text-gray-600">Programming Language</label>
                  <Select
                    isMulti
                    name="programmingLanguage"
                    options={languageOptions}
                    className="mt-2 block w-full"
                    value={languageOptions.filter(option => formData.programmingLanguage.includes(option.value))}
                    onChange={(selectedOptions) => handleMultiSelectChange('programmingLanguage', selectedOptions)}
                  />
                </div>
                <div className='w-80'>
                  <label className="block text-sm font-medium text-gray-600">Select Upload Type:</label>
                  <select
                    id="chooseUpload"
                    name="chooseUpload"
                    value={formData.chooseUpload}
                    onChange={handleChange}
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select the option</option>
                    <option value="fullwebsite">Upload Full Website</option>
                    <option value="piececode">Piece of Code</option>
                  </select>
                </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">How Does App Work</label>
                  <TagsInput
                    value={formData.appUse}
                    onChange={handleAppUse}
                    inputProps={{ placeholder: 'Describe usage', className: 'w-full border-none p-3 rounded-lg' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Features</label>
                  <TagsInput
                    value={formData.features}
                    onChange={handleFeaturesChange}
                    inputProps={{ placeholder: 'Add a feature', className: 'w-full border-none p-3 rounded-lg' }}
                  />
                </div>
              </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Visuals</h2>
            {/* Step 2: Visuals Section */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Live Preview URL</label>
              <input
                type="url"
                name="livePreview"
                value={formData.livePreview}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Upload Images of Project</label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Pricing</h2>
            {/* Step 3: Pricing Section */}
            <div>
                  <label className="block text-sm font-medium text-gray-600">Tags</label>
                  <TagsInput
                    value={formData.tags}
                    onChange={handleTagsChange}
                    inputProps={{ placeholder: 'Add a tag', className: 'w-full border-none p-3 rounded-lg' }}
                  />
                </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Pricing</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-600">Special Offers</label>
              <textarea
                name="offers"
                value={formData.offers}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Apply for a Discount</label>
              <textarea
                name="apply"
                value={formData.apply}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
            </div> */}
             {/* Terms of Service Section */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Terms of Service</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  I agree to the terms and conditions.
                </label>
              </div>
            </div>
          </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to render the step indicator
  const renderStepIndicator = () => {
    const steps = ['Step 1: Details', 'Step 2: Visuals', 'Step 3: Pricing'];
    return (
      <div className="flex justify-between items-center gap-8 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div
              className={`text-center font-semibold p-3 border-2 rounded-lg ${
                currentStep === index + 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-600 border-gray-200'
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-2 ${currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'} flex-grow`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">Sell Your Code</h1>
        {/* Step Indicator */}
        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-300 text-gray-800 font-medium text-lg rounded-lg shadow-lg hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-3 bg-green-600 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellCodePage;
