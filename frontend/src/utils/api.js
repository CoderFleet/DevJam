import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/users", 
  withCredentials: true, // Required for cookies (refresh tokens)
});

// Add JWT to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


/* ----------  Authentication API Calls---------- */
export const register = (formData) => API.post("/register", formData);
export const login = (credentials) => API.post("/login", credentials);
export const logout = () => API.post("/logout");
export const refreshToken = () => API.post("/refresh-token");
export const getCurrentUser = () => API.get("/current-user");

