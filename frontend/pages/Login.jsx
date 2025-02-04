import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../utils/api';

const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(credentials);
      localStorage.setItem("token", data.accessToken);
      dispatch({ type: "LOGIN", payload: data.user });
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="scoped-styles">
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-6'>
      <h1 className="text-3xl font-semibold mb-5 text-black">Sign In</h1>
      <span className="text-xl mb-3">or use your email & password</span>
      <input
        type="email"
        name="email"
        value={credentials.email}
        placeholder="Email"
        className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="Password"
        className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="mt-4 h-10 w-24 bg-gradient-to-r from-[#430f58] to-[#6643b5] text-white rounded-lg cursor-pointer uppercase font-semibold"
      >
        Login
      </button>
    </form>
    </div>
  );
};

export default Login;