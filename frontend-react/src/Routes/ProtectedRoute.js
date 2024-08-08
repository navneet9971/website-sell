import React, { useRef, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element }) => {
  const userId  = Cookies.get("userId")
  const toastShownRef = useRef(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (!userId && !toastShownRef.current) {
      toast.error('You need to be logged in to access this page');
      toastShownRef.current = true;
      setShouldNavigate(true);
    }
  }, [ userId]);

  if (userId) {
    return element;
  } else {
    if (shouldNavigate) {
      return <Navigate to="/" />;
    }
    return null;
  }
};

export default ProtectedRoute;
