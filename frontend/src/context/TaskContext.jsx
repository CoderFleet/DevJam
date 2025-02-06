import React, { createContext, useState, useContext, useEffect } from "react";
import { createTask, getUserTasks, updateTask, deleteTask } from "../utils/apitask"; // Import API functions

// Create Context
const TaskContext = createContext();

// Custom hook to use TaskContext
export const useTasks = () => {
  return useContext(TaskContext);
};

// Function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);


// TaskProvider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await getUserTasks();
      setTasks(response.data.data); // Assuming response.data.data holds the tasks array
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const handleCreate = async (taskData) => {
    setIsLoading(true);
    try {
      await createTask(taskData);
      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.response?.data?.message || "Error creating task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing task
  const handleUpdate = async (taskId, taskData) => {
    if (!isValidObjectId(taskId)) {
      setError("Invalid Task ID");
      return;
    }

    setIsLoading(true);
    try {
      await updateTask(taskId, taskData);
      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.response?.data?.message || "Error updating task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    if (!isValidObjectId(taskId)) {
      setError("Invalid Task ID");
      return;
    }

    setIsLoading(true);
    try {
      await deleteTask(taskId);
      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, handleCreate, handleUpdate, handleDelete, isLoading, error }}>
      {children}
    </TaskContext.Provider>
  );
};
