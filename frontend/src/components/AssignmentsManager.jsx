import React, { useState, useEffect } from "react";
import { useAssignments } from "../context/AssignmentContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
<<<<<<< HEAD
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function AssignmentsPage() {

   const theme=useTheme();
  const { assignments, fetchAssignments, handleCreate, handleUpdate, handleDelete, isLoading, error } = useAssignments();
=======
import { ThemeProvider } from "../context/ThemeContext";

export default function AssignmentsPage() {

  const { assignments, fetchAssignments, addAssignment, removeAssignment, isLoading, error } = useAssignments();
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
  const [assignmentData, setAssignmentData] = useState({ title: "", description: "", due_date: "", docs: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAssignments();
<<<<<<< HEAD
  }, [fetchAssignments]);
=======
  }, []);
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a

  const handleFileChange = (e) => {
    setAssignmentData({ ...assignmentData, docs: e.target.files });
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment._id);
<<<<<<< HEAD
    setAssignmentData({ 
      title: assignment.title, 
      description: assignment.description, 
      due_date: assignment.due_date || "", 
      docs: null 
    });
=======
    setAssignmentData({ title: assignment.title, description: assignment.description, due_date: assignment.due_date || "", docs: null });
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAssignmentData({ title: "", description: "", due_date: "", docs: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
=======
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
    const formData = new FormData();
    formData.append("title", assignmentData.title);
    formData.append("description", assignmentData.description);
    formData.append("due_date", assignmentData.due_date);
<<<<<<< HEAD
    
    if (assignmentData.docs) {
      Array.from(assignmentData.docs).forEach((file) => formData.append("docs", file));
    }

    if (editingId) {
      await handleUpdate(editingId, formData); // ✅ Correct function for updating
    } else {
      await handleCreate(formData); // ✅ Correct function for adding new assignment
    }
    
=======
    if (assignmentData.docs) {
      Array.from(assignmentData.docs).forEach((file) => formData.append("docs", file));
    }
    if (editingId) {
      await addAssignment(editingId, formData);
    } else {
      await addAssignment(formData);
    }
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
    handleCancelEdit();
    fetchAssignments();
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center p-6">
      <ThemeProvider>
        <Header />
        <Sidebar />
      </ThemeProvider>

      <div className="card w-96 shadow-xl">
        <div className={`card-body w-100  border ${theme==="dark"?"border-white":"border-white"}`}>
  
            <h1 className="card-title text-3xl font-bold text-center">
            {editingId ? "Edit Assignment" : "Assignments"}
          </h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block font-medium">Title</label>
            <input 
              type="text" 
              placeholder="Enter assignment title" 
              value={assignmentData.title} 
              onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })} 
              className="input input-bordered w-full" 
            />

            <label className="block font-medium">Due Date</label>
            <input 
              type="date" 
              value={assignmentData.due_date} 
              onChange={(e) => setAssignmentData({ ...assignmentData, due_date: e.target.value })} 
              className="input input-bordered w-full" 
            />

            <label className="block font-medium">Description</label>
            <textarea 
              placeholder="Enter assignment description" 
              value={assignmentData.description} 
              onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })} 
              className="textarea textarea-bordered w-full"
            ></textarea>

            <label className="block font-medium">Upload File</label>
            <input 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              className="input input-bordered w-full" 
            />

            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary w-full">
                {editingId ? "Update Assignment" : "Add Assignment"}
              </button>
              {editingId && (
                <button type="button" className="btn btn-error" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
=======
 
    <div className={`flex flex-col gap-50 items-center p-6`}>  
    <ThemeProvider>
       <Header/>
      <Sidebar />
      </ThemeProvider>
      <div className={`card w-96 shadow-xl `}>
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold text-center">{editingId ? "Edit Assignment" : "Assignments"}</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block font-medium">Title</label>
            <input type="text" placeholder="Enter assignment title" value={assignmentData.title} onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })} className="input input-bordered w-full" />
            <label className="block font-medium">Due Date</label>
            <input type="date" value={assignmentData.due_date} onChange={(e) => setAssignmentData({ ...assignmentData, due_date: e.target.value })} className="input input-bordered w-full" />
            <label className="block font-medium">Description</label>
            <textarea placeholder="Enter assignment description" value={assignmentData.description} onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })} className="textarea textarea-bordered w-full"></textarea>
            <label className="block font-medium">Upload File</label>
            <input type="file" multiple onChange={handleFileChange} className="input input-bordered w-full" />
            <div className="flex gap-3">
              <button type="submit" className={`w-full px-4 py-2 rounded-md font-semibold transition `}>{editingId ? "Update Assignment" : "Add Assignment"}</button>
              {editingId && <button type="button" className="btn btn-error" onClick={handleCancelEdit}>Cancel</button>}
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
            </div>
          </form>
        </div>
      </div>
<<<<<<< HEAD

      {isLoading && <p className="text-center text-gray-500">Loading assignments...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="card border shadow-xl">
            <div className="card-body flex flex-col items-center gap-5">
              <h2 className="card-title text-3xl">{assignment.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 p-3">{assignment.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due: {assignment.due_date || "No date set"}
              </p>

        {/* View Document Button */}
        {assignment.docs && assignment.docs.length > 0 && (
          <a
            href={assignment.docs[0]} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            View Document
          </a>
        )}
              <div className="flex gap-4 mt-4">
                <button className="btn btn-primary" onClick={() => handleEdit(assignment)}>
                  Edit
                </button>
                <button className="btn btn-secondary" onClick={() => handleDelete(assignment._id)}>
                  Delete
                </button>
=======
      {isLoading && <p className="text-center text-gray-500">Loading assignments...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6">
        {assignments.map((assignment) => (
          <div key={assignment._id} className={`card border shadow-xl `}>
            <div className="card-body flex flex-col items-center gap-5">
              <h2 className="card-title text-3xl">{assignment.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 p-3">{assignment.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due: {assignment.due_date || "No date set"}</p>
              <div className="flex gap-4 mt-4">
                <button className="btn btn-primary" onClick={() => handleEdit(assignment)}>Edit</button>
                <button className="btn btn-secondary" onClick={() => removeAssignment(assignment._id)}>Delete</button>
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
