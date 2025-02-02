import React, { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';


const Signup = () => {
  const[email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const[name,setName]=useState('');
  const[username,setUsername]=useState('');


  const navigate=useNavigate();

  const{user,setUser}=useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: name,
      username:username,
      email:email,
      password:password,
    };

    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`)
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token)
        navigate('/main-page');
    }
  }catch(error){
    // Enhanced error handling
    console.error('Error during registration:', error); // Log entire error object
  
    if (error.response) {
      // If error.response exists, we can get details from the server's response
      console.error('Error response:', error.response);  // Log the entire error response object

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

    setEmail('');
    setName('');
    setPassword('');
    setUsername('');

  }
};
  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-6'>
    {/* Sign Up Form */}
    <h1 className="text-3xl font-semibold mb-5 text-black">Create Account</h1>
    <input 
    type="text" 
    placeholder="Name" 
    className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2"
    value={name}
    onChange={(e)=>setName(e.target.value)}
     />
    <input
     type="text"
      placeholder="Username" 
      className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2"
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
       />
    <input type="email"
     placeholder="Email"
      className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
    <input type="password" 
    placeholder="Password" 
    className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" 
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
    <button className="mt-4 h-10 w-24 bg-gradient-to-r from-[#430f58] to-[#6643b5] text-white rounded-lg uppercase font-semibold">
      Sign Up
    </button>
  </form>
  );
};

export default Signup;