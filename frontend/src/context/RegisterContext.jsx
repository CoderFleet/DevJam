import React, { createContext, useEffect, useState } from 'react';
import { register,getCurrentUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
export const RegisterContext = createContext();
export const useRegister = () => useContext(RegisterContext);

const RegisterProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser(); // Fetch user from API
        setUser(response.data.user); // Store user data
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }; 

    useEffect(() => {
      if (localStorage.getItem("token")) {
        fetchUser();
      }
    }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response=await register(data);
      console.log("Registration Response:", response.data);
      if (response.data && response.data.user) {
        setUser(response.data.user); // Store user details
        localStorage.setItem("token", response.data.token); // Save token
      } else {
        console.warn("User data missing in registration response");
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <RegisterContext.Provider value={{ formData, error, handleChange, handleSubmit,user,fetchUser }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
