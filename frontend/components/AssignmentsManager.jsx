import { useState, useEffect } from "react";
import { useAssignmentStore } from "../src/store/useAssignmentStore";
import { useTheme } from "../context/ThemeContext";
import { LuUpload } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";

export default function AssignmentsManager() {
  const theme = useTheme();
  const {
    assignments,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    isLoading,
    error,
  } = useAssignmentStore();

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    due_date: "",
    docs: [],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAssignmentData((prev) => ({ ...prev, docs: [...prev.docs, ...files] }));
  };

  const removeFile = (index) => {
    setAssignmentData((prev) => ({
      ...prev,
      docs: prev.docs.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment._id);
    setAssignmentData({
      title: assignment.title,
      description: assignment.description,
      due_date: assignment.due_date || "",
      docs: [],
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAssignmentData({ title: "", description: "", due_date: "", docs: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", assignmentData.title);
    formData.append("description", assignmentData.description);
    formData.append("due_date", assignmentData.due_date);
    assignmentData.docs.forEach((file) => formData.append("docs", file));
    if (editingId) {
      await updateAssignment(editingId, formData);
    } else {
      await createAssignment(formData);
    }
    handleCancelEdit();
    fetchAssignments();
  };

  return (
    <div className="mt-20 flex flex-col items-center p-6">
      <div className="card w-96 shadow-xl">
        <div
          className={`card-body border ${
            theme === "dark" ? "border-white" : "border-gray-200"
          }`}>
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
              onChange={(e) =>
                setAssignmentData({ ...assignmentData, title: e.target.value })
              }
              className="input input-bordered w-full"
            />

            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              value={assignmentData.due_date}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  due_date: e.target.value,
                })
              }
              className="input input-bordered w-full"
            />

            <label className="block font-medium">Description</label>
            <textarea
              placeholder="Enter assignment description"
              value={assignmentData.description}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  description: e.target.value,
                })
              }
              className="textarea textarea-bordered w-full"></textarea>

            <label className="block font-medium">Upload Files</label>
            <div className="flex items-center gap-3">
              <label className="btn btn-primary-content flex items-center gap-2 cursor-pointer justify-center">
                <LuUpload className="w-5 h-5" /> Upload Files
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {assignmentData.docs?.length > 0 && (
              <div className="mt-2 space-y-2">
                {assignmentData.docs.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-primary text-base-content p-2 rounded text">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="btn btn-sm btn-error">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary w-full">
                {editingId ? "Update Assignment" : "Add Assignment"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-gray-500">Loading assignments...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="card border shadow-xl">
            <div className="card-body flex flex-col items-center gap-5">
              <h2 className="card-title text-3xl">{assignment.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 p-3">
                {assignment.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due: {assignment.due_date || "No date set"}
              </p>
              <div className="flex flex-row gap-1">
                {assignment.docs &&
                  assignment.docs.length > 0 &&
                  assignment.docs.map((doc, index) => (
                    <a
                      key={index}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn">
                      <FaFileAlt className="size-6 text-primary-content" />
                    </a>
                  ))}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(assignment)}>
                  Edit
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteAssignment(assignment._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
