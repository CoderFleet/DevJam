import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/users", 
  withCredentials: true, // Required for cookies (refresh tokens)
});

// Add JWT to headers if available
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

/*-----------Tasks assignment calls-----------*/
// Create a new task
export const createTask = (taskData) => API.post("/tasks", taskData);

// Get all tasks for the current user
export const getUserTasks = () => API.get("/tasks");

// Update a task
export const updateTask = (taskId, taskData) =>
  API.put(`/tasks/${taskId}`, taskData);

// Delete a task
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);





/* ----------  Assignment API Calls ----------*/ 


export const createAssignment = (formData) =>
  API.post("/assignments", formData, { headers: { "Content-Type": "multipart/form-data" } });

// Get all assignments for the current user
export const getUserAssignments = () => API.get("/assignments");

// Update an assignment
export const updateAssignment = (assignmentId, formData) =>
  API.put(`/assignments/${assignmentId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

// Delete an assignment
export const deleteAssignment = (assignmentId) => API.delete(`/assignments/${assignmentId}`);

