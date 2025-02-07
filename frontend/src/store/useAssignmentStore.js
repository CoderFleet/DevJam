import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

export const useAssignmentStore = create((set) => ({
  assignments: [],
  isLoading: false,
  error: null,

  fetchAssignments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/assignments/getAssignments");
      set({ assignments: response.data.data, isLoading: false });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error fetching assignments";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  createAssignment: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/assignments", formData);
      toast.success("Assignment created successfully");
      await useAssignmentStore.getState().fetchAssignments();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error creating assignment";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  updateAssignment: async (assignmentId, formData) => {
    if (!isValidObjectId(assignmentId)) {
      const errorMessage = "Invalid Assignment ID";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return;
    }

    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/assignments/${assignmentId}`, formData);
      toast.success("Assignment updated successfully");
      await useAssignmentStore.getState().fetchAssignments();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error updating assignment";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  deleteAssignment: async (assignmentId) => {
    if (!isValidObjectId(assignmentId)) {
      const errorMessage = "Invalid Assignment ID";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return;
    }

    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/assignments/${assignmentId}`);
      toast.success("Assignment deleted successfully");
      await useAssignmentStore.getState().fetchAssignments();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error deleting assignment";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },
}));
