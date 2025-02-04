import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/assignments", // Update with your actual backend URL
  withCredentials: true, // Required for cookies (refresh tokens)
});

// Add JWT to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ----------- Assignment API Calls ----------- */

// Create a new assignment
export const createAssignment = (formData) =>
  API.post("/", formData, { headers: { "Content-Type": "multipart/form-data" } });

// Get all assignments for the current user
export const getUserAssignments = () => API.get("/");

// Get a specific assignment by ID
export const getAssignmentById = (assignmentId) => API.get(`/${assignmentId}`);

// Update an assignment
export const updateAssignment = (assignmentId, formData) =>
  API.put(`/${assignmentId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

// Delete an assignment
export const deleteAssignment = (assignmentId) => API.delete(`/${assignmentId}`);
