import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

// Define different background colors for tasks
const taskColors = [
  "bg-red-100 border-red-400 dark:bg-red-900 dark:border-red-600",
  "bg-blue-100 border-blue-400 dark:bg-blue-900 dark:border-blue-600",
  "bg-green-100 border-green-400 dark:bg-green-900 dark:border-green-600",
  "bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-600",
  "bg-purple-100 border-purple-400 dark:bg-purple-900 dark:border-purple-600",
  "bg-pink-100 border-pink-400 dark:bg-pink-900 dark:border-pink-600",
  "bg-indigo-100 border-indigo-400 dark:bg-indigo-900 dark:border-indigo-600",
];

export default function TaskManager() {
  const { theme } = useTheme(); // Get theme state

  const {
    tasks,
    newTask,
    setNewTask,
    editingTask,
    setEditingTask,
    isLoading,
    handleCreate,
    handleUpdate,
    handleDelete,
    error,
  } = useTasks();

  return (
    <div className={`flex flex-col gap-10 items-center p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Task Manager Card */}
      <div className={`card w-96 shadow-xl ${theme === "dark" ? "bg-grey-600 border border-gray-600" : "bg-grey-900"}`}>
        <div className="card-body">
          <h1 className="card-title text-center">Task Manager</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Task Input Form */}
          <div className="space-y-3">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={newTask?.title || ""}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className={`input input-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : ""}`}
            />

            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              value={newTask?.due_date || ""}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              className={`input input-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : ""}`}
            />

            <label className="block font-medium">Description</label>
            <textarea
              placeholder="Enter task description"
              value={newTask?.description || ""}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className={`textarea textarea-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : ""}`}
            ></textarea>

            <button 
              onClick={handleCreate} 
              disabled={!newTask?.title}
              className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} w-full ${newTask?.title ? "btn-primary" : "btn-disabled"}`}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <p className="text-center text-gray-500 mt-4">Loading tasks...</p>}

      {/* Task List - Display in rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full px-6">
        {tasks.map((task, index) => {
          const colorClass = taskColors[index % taskColors.length];

          return (
            <Link to={`/task/${task._id}`} key={task._id} className="w-full">
              <div className={`card w-full border shadow-lg ${colorClass} cursor-pointer`}>
                <div className={`card-body ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : ""}`}>
                  <h2 className="card-title">{task.title}</h2>
                  <p className={`text-gray-600 ${theme === "dark" ? "text-gray-300" : ""}`}>{task.description}</p>
                  <p className={`text-sm text-gray-500 ${theme === "dark" ? "text-gray-400" : ""}`}>
                    Due: {task.due_date || "No date set"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
