import { deviceOptions, industryOptions, languageOptions } from '../../data/data';
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
  handleChange
}) => {

  return (
    <div>
      <h1 className='text-center text-4xl font-bold mb-10'>Sell Your Code Form</h1>
      <form onSubmit={handleSubmit} className='p-6 space-y-10'>
        {/* Source Code Details Section */}
        <div className='flex items-start justify-around'>
          <div className='w-2/5 h-auto bg-gray-100 shadow-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Source Code Details</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium'>Source Code Product Title</label>
                <input
                  type='text'
                  name='productTitle'
                  value={formData.productTitle}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>Source Code Description</label>
                <textarea
                  name='codeDescription'
                  value={formData.codeDescription}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                  rows='3'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>Tags</label>
                <TagsInput value={formData.tags} onChange={handleTagsChange} inputProps={{ placeholder: 'Add a tag' }} />
              </div>
              <div>
                <label className='block text-sm font-medium'>Programming Language</label>
                <Select
                  isMulti
                  name='programmingLanguage'
                  options={languageOptions}
                  className='mt-1 block w-full p-2 border rounded-md'
                  value={languageOptions.filter(option => formData.programmingLanguage.includes(option.value))}
                  onChange={(selectedOptions) => handleMultiSelectChange('programmingLanguage', selectedOptions)}
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>
                  Select Upload Type:
                </label>
                <select
                  id="chooseUpload"
                  name="chooseUpload"
                  value={formData.chooseUpload}
                  onChange={handleChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                >
                  <option value="">Select the option</option>
                  <option value="fullwebsite">Upload Full Website</option>
                  <option value="piececode">Piece of Code</option>
                </select>
              </div>
            </div>
          </div>
          <div className='w-2/5 h-auto bg-gray-100 shadow-lg p-6'>
            <div>
              <label className='block text-sm font-medium'>Features</label>
              <TagsInput value={formData.features} onChange={handleFeaturesChange} inputProps={{ placeholder: 'Add a feature' }} />
            </div>
            <div>
              <label className='block text-sm font-medium'>Installation Instructions</label>
              <textarea
                name='installationInstructions'
                value={formData.installationInstructions}
                onChange={handleInputChange}
                className='mt-1 block w-full p-2 border rounded-md'
                rows='3'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Change and Adaptation Instructions</label>
              <textarea
                name='adaptationInstructions'
                value={formData.adaptationInstructions}
                onChange={handleInputChange}
                className='mt-1 block w-full p-2 border rounded-md'
                rows='3'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Industry</label>
              <Select
                isMulti
                name='industry'
                options={industryOptions}
                className='mt-1 block w-full p-2 border rounded-md'
                value={industryOptions.filter(option => formData.industry.includes(option.value))}
                onChange={(selectedOptions) => handleMultiSelectChange('industry', selectedOptions)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Devices</label>
              <Select
                isMulti
                name='devices'
                options={deviceOptions}
                className='mt-1 block w-full p-2 border rounded-md'
                value={deviceOptions.filter(option => formData.devices.includes(option.value))}
                onChange={(selectedOptions) => handleMultiSelectChange('devices', selectedOptions)}
              />
            </div>
          </div>
        </div>

        {/* Visuals Section */}
        <div className='w-full flex items-start justify-around'>
          <div className='w-2/5 h-auto bg-blue-100 shadow-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Visuals</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium'>Live Preview URL</label>
                <input
                  type='url'
                  name='livePreview'
                  value={formData.livePreview}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>Video URL</label>
                <input
                  type='url'
                  name='videoUrl'
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>Upload Images of Project</label>
                <input
  type='file'
  name='projectImages'
  multiple
  onChange={handleFileChange}
  className='mt-1 block w-full p-2 border rounded-md'
/>

              </div>
            </div>
          </div>

          {/* Document and Code Section */}
          <div className='w-2/5 h-auto bg-green-100 shadow-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Document and Code</h2>
            <div className='space-y-4'>
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
              <div>
                <label className='block text-sm font-medium'>Upload Project Code (ZIP)</label>
                <input
                  type='file'
                  name='projectCode'
                  accept='.zip'
                  onChange={handleFileChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-start justify-around'>
          {/* Pricing Section */}
          <div className='w-2/5 h-auto bg-red-100 shadow-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Pricing</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium'>Price</label>
                <input
                  type='text'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
              </div>
              <div className='flex items-center space-x-4'>
                <input
                  type='checkbox'
                  name='weeklyFreeCode'
                  value='Add Product on Weekly Free Source Code'
                  onChange={handleCheckboxChange}
                  className='mt-1'
                />
                <label className='text-sm font-medium'>Add Product on Weekly Free Source Code</label>
              </div>
              <div className='flex items-center space-x-4'>
                <input
                  type='checkbox'
                  name='monthlyFreeCode'
                  value='Add Product on Monthly Free Source Code'
                  onChange={handleCheckboxChange}
                  className='mt-1'
                />
                <label className='text-sm font-medium'>Add Product on Monthly Free Source Code</label>
              </div>
            </div>
          </div>

          {/* Terms of Service Section */}
          {/* <div className='w-2/5 h-auto bg-purple-100 shadow-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Terms of Service</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium'>Terms of Service</label>
                <textarea
                  name='termsOfService'
                  value={formData.termsOfService}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                  rows='3'
                />
              </div>
            </div>
          </div> */}
        </div>

        <div className='flex justify-center mt-10'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellCodePage;
