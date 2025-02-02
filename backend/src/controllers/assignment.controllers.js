import { Assignment } from "../models/assignment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloud } from "../utils/cloudinary.js";

const createAssignment = asyncHandler(async (req, res) => {
  const { title, description, due_date } = req.body;

  if ([title, due_date].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Some fields are required fields");
  }

  const docs = req.files
    ? req.files.map(async (file) => {
        const localPath = file.path;
        console.log(localPath);
        const doc = await uploadToCloud(localPath);

        return doc.url;
      })
    : [];

  const uploadedDocs = await Promise.all(docs);

  const assignment = await Assignment.create({
    title,
    description,
    docs: uploadedDocs,
    due_date,
    user: req.user._id,
  });

  const assignmentFromDB = await Assignment.findById(assignment._id);

  if (!assignmentFromDB) {
    throw new ApiError(500, "Something went wrong while creating Assignment");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, assignmentFromDB, "Assignment Ban Gaya 🤩!"));
});

const getUserAssignments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const assignments = await Assignment.find({ user: userId }).sort({
    createdAt: -1,
  });

  if (!assignments.length) {
    throw new ApiError(404, "No assignments found for this user...");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, assignments, "Assignments Fetched"));
});

export { createAssignment, getUserAssignments };
