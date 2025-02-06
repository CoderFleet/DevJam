import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  createAssignment, 
  getUserAssignments, 
  updateAssignment, 
  deleteAssignment 
} from "../utils/assignmentapi"; // Import API functions

// Create Context
const AssignmentContext = createContext();

// Custom hook to use AssignmentContext
export const useAssignments = () => {
  return useContext(AssignmentContext);
};

// Function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

// AssignmentProvider Component
export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch assignments from API
  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const response = await getUserAssignments();
      setAssignments(response.data.data); // Assuming response.data.data holds the assignments array
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching assignments");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new assignment
  const handleCreate = async (formData) => {
    setIsLoading(true);
    try {
      await createAssignment(formData);
      fetchAssignments(); // Refresh assignment list
    } catch (err) {
      setError(err.response?.data?.message || "Error creating assignment");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing assignment
  const handleUpdate = async (assignmentId, formData) => {
    if (!isValidObjectId(assignmentId)) {
      setError("Invalid Assignment ID");
      return;
    }

    setIsLoading(true);
    try {
      await updateAssignment(assignmentId, formData);
      fetchAssignments(); // Refresh assignment list
    } catch (err) {
      setError(err.response?.data?.message || "Error updating assignment");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an assignment
  const handleDelete = async (assignmentId) => {
    if (!isValidObjectId(assignmentId)) {
      setError("Invalid Assignment ID");
      return;
    }

    setIsLoading(true);
    try {
      await deleteAssignment(assignmentId);
      fetchAssignments(); // Refresh assignment list
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting assignment");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load assignments when component mounts
  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <AssignmentContext.Provider 
      value={{ assignments, fetchAssignments, handleCreate, handleUpdate, handleDelete, isLoading, error }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};