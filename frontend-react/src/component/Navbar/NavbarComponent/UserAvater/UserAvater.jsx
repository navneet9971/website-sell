import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import clearCookies from '../../../../RemoveCookies/ClearCookies';
import Cookies from 'js-cookie';

const UserAvater = () => {
  const [userObject, setUserObject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = Cookies.get('userData');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserObject(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.log('No user data found');
    }
  }, []); 

  const handleSignOut = () => {
    navigate('/sign-in');
    clearCookies();
  };

  return (
    <Navbar fluid rounded className='bg-gray-800 py-0 px-0'>
      <div className="flex md:order-2">
        {userObject && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <img
              alt="User settings"
              src={userObject.profilePic}
              className='w-[3.2rem] h-[2.9rem] object-centre rounded-full'
            />            
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userObject.fullName}</span>
              <span className="block truncate text-sm font-medium">{userObject.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default UserAvater;
