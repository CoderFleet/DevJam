import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useState(null);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ isSignUp, toggleForm, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext
