import { Task } from "../models/task.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, due_date } = req.body;

  if ([title, due_date].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Some fields are required fields");
  }

  if (!title || !description) throw new ApiError(400, "Not present");

  const task = await Task.create({
    title,
    description,
    due_date,
    user: req.user._id,
  });

  const taskFromDB = await Task.findById(task._id);

  if (!taskFromDB) {
    throw new ApiError(500, "Something went wrong while creating Task");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, taskFromDB, "Task Ban Gaya 🤡!"));
});

const getUserTasks = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const tasks = await Task.find({ user: userId }).sort({
    createdAt: -1,
  });

  // if (!tasks.length) {
  //   throw new ApiError(404, "No tasks found for this user...");
  // }

  return res.status(200).json(new ApiResponse(200, tasks, "Tasks Fetched"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, due_date } = req.body;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(400, "Invalid Task ID");
  }

  // Better approach (apparently😭)
  const task = await Task.findOne({
    _id: taskId,
    user: req.user._id,
  });
  // Validation Again 💀
  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized access");
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.due_date = due_date || task.due_date;

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task Updated Successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid Task ID.");
  }

  const task = await Task.findOne({
    _id: taskId,
    user: req.user._id,
  });
  // Validation Again 💀
  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized access");
  }

  await Task.findByIdAndDelete(taskId);

  return res.status(200).json(new ApiResponse(200, {}, "Khatam tata bye bye"));
});

export { createTask, getUserTasks, updateTask, deleteTask };
