import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook for navigation
  const navigate = useNavigate();
  
  // Accessing setUser function from UserContext
  const { setUser } = useContext(UserContext);

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // User data to be sent to the server
    const userData = {
      email: email,
      password: password,
    };

    try {
      // Sending a POST request to the login endpoint
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, userData);
      
      // If login is successful
      if (response.status === 200) {
        const data = response.data;
        
        // Setting the user data in context
        setUser(data.user);
        
        // Storing the token and user data in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Navigating to the main page
        navigate('/main-page');
      }
    } catch (error) {
      // Logging the error to the console
      console.error('Error during login:', error);

      // Handling different types of errors
      if (error.response) {
        console.error('Error response:', error.response);
        const errorData = error.response.data;
        if (errorData) {
          const message = errorData.message || 'Something went wrong on the server.';
          alert(`Error: ${message}`);
        } else {
          alert('Something went wrong on the server.');
        }
      } else if (error.request) {
        alert('Network error. Please check your internet connection.');
      } else if (error.message) {
        alert(error.message);
      } else {
        alert('An error occurred while setting up the request.');
      }
    }

    // Clearing the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-5 text-black">Sign In</h1>
      <span className="text-xl mb-3">or use your email & password</span>
      <input
        type="email"
        placeholder="Email"
        className="bg-gray-200 w-72 h-10 p-3 rounded-lg mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="bg-gray-200 w-72 h-10 p-3 rounded-lg mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="mt-4 h-10 w-24 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg uppercase font-semibold"
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;