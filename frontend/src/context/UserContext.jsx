import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the application and provide the context
export const UserProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useState(null);

  // Function to toggle between sign up and login forms
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ isSignUp, toggleForm, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;