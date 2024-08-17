import React, { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const UserProfilePage = ({ userData, formData, handleChange, handleSubmit, handleFileChange }) => {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageRef.current) {
          imageRef.current.src = reader.result; // Update image src for preview
        }
      };
      reader.readAsDataURL(file);
    }
    handleFileChange(e); // Handle file change for form submission
  };


  return (
    <div className="flex items-center justify-center mt-2 mb-3">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg">
        <div className="bg-gray-200 p-6 flex items-center gap-6">
          <div className="h-20 w-20 bg-gray-300 rounded-full overflow-hidden">
          <img
              ref={imageRef}
              src={userData.profilePic || "/placeholder-user.jpg"}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">{userData.fullName || "Abhi Jha"}</h2>
            <div className="text-gray-600">@{userData.userName || "abhijha"}</div>
          </div>
          <button 
            className="ml-auto border border-gray-300 px-4 py-2 rounded bg-white text-gray-700"
            onClick={handleButtonClick} 
          >
            Change Photo
          </button>
          <input 
            type="file" 
            name="profilePic" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleImageChange} 
          />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={userData.fullName || ""}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={userData.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            {/* Other input fields */}
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
              <input
                id="twitter"
                type="text"
                value={formData.twitter}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                id="facebook"
                type="text"
                value={formData.facebook}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                id="linkedin"
                type="text"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
              <input
                id="github"
                type="text"
                value={formData.github}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself..."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[100px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 p-6">
          <button
            onClick={handleSubmit}
            className="border border-gray-300 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
