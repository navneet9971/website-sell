import React, { useRef, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const toastShownRef = useRef(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn && !toastShownRef.current) {
      toast.error('You need to be logged in to access this page');
      toastShownRef.current = true;
      setShouldNavigate(true);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return element;
  } else {
    if (shouldNavigate) {
      return <Navigate to="/" />;
    }
    return null;
  }
};

export default ProtectedRoute;
