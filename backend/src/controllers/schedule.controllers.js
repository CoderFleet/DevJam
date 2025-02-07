import { Schedule } from "../models/schedules.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// const createSchedule = asyncHandler(async (req, res) => {
//   const { reminderDate, assignmentId, taskId, message } = req.body;

//   if (!reminderDate) {
//     throw new ApiError(400, "date is required");
//   }

//   if (assignmentId && taskId) {
//     throw new ApiError(
//       400,
//       "Schedule can be linked to either an assignment or a task, not both."
//     );
//   }

//   const schedule = await Schedule.create({
//     user: req.user._id,
//     reminderDate,
//     assignmentId: assignmentId || null,
//     taskId: taskId || null,
//     message: message || "Karle Bhai Complete",
//   });

//   return res
//     .status(201)
//     .json(new ApiResponse(201, schedule, "Schedule Bangaya 🤩!"));
// });

const getUserSchedules = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const schedules = await Schedule.find({ user: userId })
    .populate("assignmentId", "title due_date")
    .populate("taskId", "title deadline")
    .sort({ reminderDate: 1 });

  if (!schedules.length) {
    throw new ApiError(404, "No Schedule");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, schedules, "Schedules Fetched Successfully"));
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const { scheduleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
    throw new ApiError(400, "Invalid ScheduleId.");
  }

  const schedule = await Schedule.findOne({
    _id: scheduleId,
    user: req.user._id,
  });

  if (!schedule) {
    throw new ApiError(404, "Schedule not found or unauthorized access");
  }

  await Schedule.findByIdAndDelete(scheduleId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Schedule Deleted Successfully"));
});

export { getUserSchedules, deleteSchedule };
