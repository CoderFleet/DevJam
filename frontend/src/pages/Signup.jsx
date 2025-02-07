import React, { useContext } from 'react';
import { RegisterContext } from '../context/RegisterContext';
import { useEffect } from 'react';
const Signup = () => {
 
 
  const { formData, error, handleChange, handleSubmit,user,fetchUser } = useContext(RegisterContext);
  useEffect(() => {
    fetchUser(); // Fetch user details when Signup component mounts
  }, []);


  
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold mb-5 text-black">Create Account</h1>
        <input 
          type="text" 
          name="fullName"
          value={formData.fullName}
          placeholder="Full Name" 
          className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username" 
          className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2"
          onChange={handleChange}
        />
        <input 
          type="email"
          name="email"
          placeholder="Email"
          className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" 
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password"
          value={formData.password}
          placeholder="Password" 
          className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" 
          onChange={handleChange}
        />
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" 
        />
        <button 
          type="submit" 
          className="mt-4 h-10 w-24 bg-gradient-to-r from-[#430f58] to-[#6643b5] text-white rounded-lg uppercase font-semibold"
        >
          Register
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
