// api.js
import axios from "axios";

const API_URL = "http://localhost:5000"; // Adjust the URL as per your backend

// Axios instance with JWT token header
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all users
export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.data;
};

// Get messages for a specific user
export const getMessages = async (userId) => {
  const response = await axiosInstance.get(`/messages/${userId}`);
  return response.data.data;
};

// Send a message
export const sendMessage = async (receiverId, text, file) => {
  const formData = new FormData();
  formData.append("text", text);
  if (file) {
    formData.append("img", file);
  }
  const response = await axiosInstance.post(`/send/${receiverId}`, formData);
  return response.data.data;
};
