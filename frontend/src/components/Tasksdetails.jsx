import React from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function TaskDetails() {
  const { taskId } = useParams();
  const { tasks } = useTasks();

  // Find the task by ID
  const task = tasks.find((task) => task._id === taskId);

  if (!task) {
    return <div className="text-center text-red-500">Task not found</div>;
  }

  return (
    <div className="flex flex-col bg-white h-screen items-center p-6">
      <div className="card w-96 shadow-xl p-6 bg-base-100">
        <h1 className="text-xl font-bold">{task.title}</h1>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">Due: {task.due_date || "No date set"}</p>
      </div>
    </div>
  );
}
