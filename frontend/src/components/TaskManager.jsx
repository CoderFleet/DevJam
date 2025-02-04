import React from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskManager() {
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
    <body>
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded"
        ></textarea>
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded w-full">
          Add Task
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="p-2 border mb-2 flex justify-between items-center">
            {editingTask && editingTask._id === task._id ? (
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="p-1 border rounded"
              />
            ) : (
              <span>{task.title}</span>
            )}
            <div className="space-x-2">
              {editingTask && editingTask._id === task._id ? (
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-green-500  p-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-yellow-500 p-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500  p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>

        ))}
      </ul>
    </div>
    </body>
  );
}
