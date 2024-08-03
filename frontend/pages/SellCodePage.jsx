import { deviceOptions, industryOptions, languageOptions } from '/data/data';
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
  handleFeaturesChange
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
                <label className='block text-sm font-medium'>Select Upload Type:</label>
                <select
                  id='chooseUpload'
                  name='chooseUpload'
                  value={formData.chooseUpload}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                >
                  <option value=''>Select the option</option>
                  <option value='fullwebsite'>Upload Full Website</option>
                  <option value='piececode'>Piece of Code</option>
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
                <label className='block text-sm font-medium'>Project Images</label>
                <input
                  type='file'
                  name='projectImages'
                  onChange={handleFileChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                  accept='image/*'
                />
              </div>
            </div>
          </div>
          <div className='w-2/5 h-auto bg-blue-100 shadow-lg p-6'>
            <div>
              <label className='block text-sm font-medium'>Price</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                className='mt-1 block w-full p-2 border rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Weekly Free Code</label>
              <input
                type='text'
                name='weeklyFreeCode'
                value={formData.weeklyFreeCode}
                onChange={handleInputChange}
                className='mt-1 block w-full p-2 border rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Offer Option Book</label>
              <input
                type='text'
                name='offerOptionBook'
                value={formData.offerOptionBook}
                onChange={handleInputChange}
                className='mt-1 block w-full p-2 border rounded-md'
              />
            </div>
          </div>
        </div>
        <button type='submit' className='w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SellCodePage;
