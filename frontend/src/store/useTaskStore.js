import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useTaskStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/tasks/getTasks");
      set({ tasks: response.data.data, isLoading: false });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error fetching tasks";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  handleCreate: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/tasks", taskData);
      toast.success("Task created successfully");
      await useTaskStore.getState().fetchTasks();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error creating task";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  handleUpdate: async (taskId, taskData) => {
    if (!/^[a-f\d]{24}$/i.test(taskId)) {
      const errorMessage = "Invalid Task ID";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return;
    }
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/tasks/${taskId}`, taskData);
      toast.success("Task updated successfully");
      await useTaskStore.getState().fetchTasks();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error updating task";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  handleDelete: async (taskId) => {
    if (!/^[a-f\d]{24}$/i.test(taskId)) {
      const errorMessage = "Invalid Task ID";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return;
    }
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully");
      await useTaskStore.getState().fetchTasks();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error deleting task";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },
}));

export default useTaskStore;
