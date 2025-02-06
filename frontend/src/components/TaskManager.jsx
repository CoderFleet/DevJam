import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

export default function TaskManager() {
  const { theme } = useTheme();
  const {
    tasks,
    fetchTasks,
    handleCreate,
    handleUpdate,
    handleDelete,
    isLoading,
    error,
  } = useTasks();

  const [taskData, setTaskData] = useState({ title: "", description: "", due_date: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTaskData({ title: task.title, description: task.description, due_date: task.due_date || "" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTaskData({ title: "", description: "", due_date: "" });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await handleUpdate(editingId, taskData);
    } else {
      await handleCreate(taskData);
    }
    handleCancelEdit();
    fetchTasks();
  };

  return (
    <div className={`flex flex-col gap-10 items-center p-6 ${theme === "dark" ? " text-white" : " text-black"}`}>
      {/* Add/Edit Task Card */}
      <div className={`card w-96 shadow-xl ${theme === "dark" ? "bg-gray-800 border border-white " : "bg-white border border-black "}`}>
        <div className="card-body">
          <h1 className="card-title  text-3xl font-bold text-center">{editingId ? "Edit Task" : "Task Manager"}</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-3">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              className="input input-bordered w-full"
            />
            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              value={taskData.due_date}
              onChange={(e) => setTaskData({ ...taskData, due_date: e.target.value })}
              className="input input-bordered w-full"
            />
            <label className="block font-medium">Description</label>
            <textarea
              placeholder="Enter task description"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            <div className="flex gap-3">
              <button 
                onClick={handleSubmit} 
                className={`w-full px-4 py-2 rounded-md font-semibold transition 
                  ${theme === "dark" ? "bg-white text-black hover:bg-gray-300" : "bg-black text-white hover:bg-gray-800"}`}
              >
                {editingId ? "Update Task" : "Add Task"}
              </button>
              {editingId && <button className="btn btn-error" onClick={handleCancelEdit}>Cancel</button>}
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <p className="text-center text-gray-500">Loading tasks...</p>}

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6">
        {tasks.map((task) => (
          <div 
            key={task._id} 
            className={`card border shadow-xl ${theme === "dark" ? "bg-gray-800 border border-white " : "bg-white border border-black "}`}
          >
            <div className="card-body flex flex-col items-center gap-5">
              <h2 className="card-title text-3xl">{task.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 p-3">{task.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due: {task.due_date || "No date set"}</p>
              
              {/* Task Actions */}
              <div className="flex gap-4 mt-4">
                <div className={`${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"} rounded-lg p-2 w-10 shadow-md`}>
                  <button className="btn btn-primary" onClick={() => handleEdit(task)}>Edit</button>
                </div>

                <div className={`${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"} rounded-lg p-2 w-15 shadow-md`}>
                  <button className="btn btn-secondary" onClick={() => handleDelete(task._id)}>Delete</button>
                </div>

          
              </div>
            </div>
          </div>
        ))}
      </div>
          
        
    </div>
  );
}
