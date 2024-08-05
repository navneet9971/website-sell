import React from 'react';
import SigninForm from './signInForm';

const Signin = () => {

  const handleSignin = async ({ formData }) => {
    // Replace this with your API call
    alert('Submitting:', { formData });
    // Example API call:
    // const response = await fetch('/api/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, remember }),
    // });
    // const data = await response.json();
    // Handle response data
  };

  return (
          <SigninForm onSubmit={handleSignin} />
  );
};

export default Signin;
