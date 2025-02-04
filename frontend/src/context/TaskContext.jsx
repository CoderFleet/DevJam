import React, { createContext, useState, useContext, useEffect } from "react";
import { createTask, getUserTasks, updateTask, deleteTask } from "../utils/apitask"; // Import API functions

// Create Context
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTasks = () => {
  return useContext(TaskContext);
};

// TaskProvider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", due_date: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await getUserTasks();
      setTasks(response.data.data);
    } catch (err) {
      setError("Error fetching tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const handleCreate = async () => {
    if (!newTask.title || !newTask.due_date) return;
    setIsLoading(true);
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "", due_date: "" });
      fetchTasks(); // Re-fetch tasks after adding
    } catch (err) {
      setError("Error creating task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing task
  const handleUpdate = async (taskId) => {
    if (!editingTask) return;
    setIsLoading(true);
    try {
      await updateTask(taskId, editingTask);
      setEditingTask(null);
      fetchTasks(); // Re-fetch tasks after updating
    } catch (err) {
      setError("Error updating task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    setIsLoading(true);
    try {
      await deleteTask(taskId);
      fetchTasks(); // Re-fetch tasks after deleting
    } catch (err) {
      setError("Error deleting task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize by fetching tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        newTask,
        setNewTask,
        editingTask,
        setEditingTask,
        isLoading,
        error,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
