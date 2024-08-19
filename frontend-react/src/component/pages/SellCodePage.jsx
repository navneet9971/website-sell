import React from 'react';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

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
  handleAppUse,
  languageOptions,
  codeTypes,
  industryOptions,
  deviceOptions,
  loading,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-6">
      <h1 className="text-center text-4xl font-bold text-gray-900 mb-4">
        Sell Your Code
      </h1>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="text-lg font-semibold text-white">Submitting...</div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8"
      >
        {/* Source Code Details & Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Source Code Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Source Code Product Title
                </label>
                <input
                  type="text"
                  name="productTitle"
                  value={formData.productTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Source Code Description
                </label>
                <textarea
                  name="codeDescription"
                  value={formData.codeDescription}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <TagsInput
                  value={formData.tags}
                  onChange={handleTagsChange}
                  inputProps={{
                    placeholder: "Add a tag",
                    className: "p-2 block mb-2 w-64 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Programming Language
                </label>
                <Select
                  isMulti
                  name="programmingLanguage"
                  options={languageOptions}
                  className="mt-1"
                  classNamePrefix="select"
                  value={languageOptions.filter((option) =>
                    formData.programmingLanguage.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange("programmingLanguage", selectedOptions)
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.375rem",
                      borderColor: "#d1d5db",
                      "&:hover": { borderColor: "#d1d5db" },
                      boxShadow: "none",
                      padding: "4px",
                      minHeight: "2.5rem",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0.5rem",
                    }),
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Upload Type
                </label>
                <select
                  id="chooseUpload"
                  name="chooseUpload"
                  value={formData.chooseUpload}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select the option</option>
                  {codeTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  How Does App Work
                </label>
                <TagsInput
                  value={formData.appUse}
                  onChange={handleAppUse}
                  inputProps={{
                    placeholder: "How to app use Step by Step",
                    className: "p-2 block mb-2 w-64 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Features & Instructions
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <TagsInput
                  value={formData.features}
                  onChange={handleFeaturesChange}
                  inputProps={{
                    placeholder: "Add a feature Step by Step",
                    className: "p-2 block mb-2 w-64 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Installation Instructions
                </label>
                <textarea
                  name="installationInstructions"
                  value={formData.installationInstructions}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <Select
                  isMulti
                  name="industry"
                  options={industryOptions}
                  className="mt-1"
                  classNamePrefix="select"
                  value={industryOptions.filter((option) =>
                    formData.industry.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange("industry", selectedOptions)
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.375rem",
                      borderColor: "#d1d5db",
                      "&:hover": { borderColor: "#d1d5db" },
                      boxShadow: "none",
                      padding: "4px",
                      minHeight: "2.5rem",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0.5rem",
                    }),
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Devices
                </label>
                <Select
                  isMulti
                  name="devices"
                  options={deviceOptions}
                  className="mt-1"
                  classNamePrefix="select"
                  value={deviceOptions.filter((option) =>
                    formData.devices.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange("devices", selectedOptions)
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.375rem",
                      borderColor: "#d1d5db",
                      "&:hover": { borderColor: "#d1d5db" },
                      boxShadow: "none",
                      padding: "4px",
                      minHeight: "2.5rem",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0.5rem",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visuals & Documents Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Visuals
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Live Preview URL
                </label>
                <input
                  type="url"
                  name="livePreview"
                  value={formData.livePreview}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Documents & Files
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Screenshots
                </label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>Upload Installation Guide (PDF)</label>
                <input
                  type='file'
                  name='installationGuide'
                  accept='application/pdf'
                  onChange={handleFileChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
              </div>
            </div>
          </div>
        </div>

        {/* {Code Upload} */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Code Zip floder Upload
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Codes File (folder in zip)
                </label>
                <input
                  type="file"
                  name="projectCode"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Pricing & Terms Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Pricing & Terms
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                I agree to the{' '}
                <a href="#terms" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            {formData.agreeToTerms && (
              <div id="terms" className="mt-4">
                <h2 className="text-lg font-semibold">Terms and Conditions</h2>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>1. Introduction</strong>
                  <br />
                  Welcome to our application. These Terms and Conditions govern your use of our services and application. By accessing or using our application, you agree to comply with and be bound by these terms.
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>2. User Responsibilities</strong>
                  <br />
                  You agree to use our services responsibly and in accordance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>3. Intellectual Property</strong>
                  <br />
                  All content, trademarks, and other intellectual property on our application are owned by us or our licensors. You may not use any content from our application without our express written permission.
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>4. Limitation of Liability</strong>
                  <br />
                  To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of our application or services.
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>5. Changes to Terms</strong>
                  <br />
                  We may update these Terms and Conditions from time to time. Your continued use of our application following any changes constitutes your acceptance of the new terms.
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>6. Contact Us</strong>
                  <br />
                  If you have any questions or concerns about these Terms and Conditions, please contact us at [your contact information].
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellCodePage;

