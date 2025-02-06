import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/assignments", // Backend URL
  withCredentials: true, // Required for authentication (cookies, sessions, etc.)
});

// Add JWT to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Adding Authorization header:", token); // Log token for debugging
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- Assignment API Calls ----------

// Create a new assignment (supports multiple files)
export const createAssignment = (formData) =>
  API.post("/", formData, { headers: { "Content-Type": "multipart/form-data" } });

// Fetch all assignments of the current user
export const getUserAssignments = () => API.get("/getAssignments");  

// Update an existing assignment
export const updateAssignment = (assignmentId, formData) =>
  API.patch(`/${assignmentId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

// Delete an assignment
export const deleteAssignment = (assignmentId) => API.delete(`/${assignmentId}`);

