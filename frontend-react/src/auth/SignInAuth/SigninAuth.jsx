import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const SsoCallback = () => {
  const { handleRedirectCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await handleRedirectCallback();
        navigate('/'); // Redirect to home page after successful authentication
      } catch (error) {
        console.error('Error during SSO callback:', error);
        navigate('/sign-in'); // Redirect to sign-in page on error
      }
    })();
  }, [handleRedirectCallback, navigate]);

  return <div>Loading...</div>;
};

export default SsoCallback;
