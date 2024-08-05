import React from 'react';
import SignUpForm from './signupForm';

const SignUp = () => {
  const handleSignUp = async (formData) => {
    // Replace this with your API call
    alert('Submitting:', JSON.stringify(formData));
    // Example API call:
    // const response = await fetch('/api/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();
    // Handle response data
  };

  return (
    <SignUpForm onSubmit={handleSignUp} />
  );
}

export default SignUp;
