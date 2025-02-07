import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/tasks", 
  withCredentials: true, // Required for cookies (refresh tokens)
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Adding Authorization header:", token); // Log token for debugging
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  



// Create a new task
export const createTask = (taskData) => API.post("/", taskData);

// Get all tasks for the current user
export const getUserTasks = () => API.get("/getTasks");

// Get a specific task by ID
export const getTaskById = (taskId) => API.get(`/${taskId}`);

// Update a task
export const updateTask = (taskId, taskData) => API.patch(`/${taskId}`, taskData);

// Delete a task
export const deleteTask = (taskId) => API.delete(`/${taskId}`);