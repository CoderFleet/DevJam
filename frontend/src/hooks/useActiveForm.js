import { useState } from 'react';

const useActiveForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return [isSignUp, toggleForm];
};

export default useActiveForm;