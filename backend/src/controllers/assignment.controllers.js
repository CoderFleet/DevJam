import { Assignment } from "../models/assignment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloud } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
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

const updateAssignment = asyncHandler(async (req, res) => {
  const { assignmentId } = req.params;
  const { title, description, due_date } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
    throw new ApiError(400, "Invalid Assignment ID");
  }

  // const assignment = await Assignment.findById(assignmentId);
  // if (!assignment) {
  //   throw new ApiError(404, "Assignment not found");
  // }
  // if (assignment.user.toString() !== req.user._id.toString()) {
  //   throw new ApiError(403, "Unauthorized to update this assignment");
  // }

  // Better approach (apparently😭)
  const assignment = await Assignment.findOne({
    _id: assignmentId,
    user: req.user._id,
  });
  // Validation Again 💀
  if (!assignment) {
    throw new ApiError(404, "Assignment not found or unauthorized access");
  }

  let uploadedDocs = assignment.docs;
  if (req.files && req.files.length > 0) {
    const docs = req.files.map(async (file) => {
      const localPath = file.path;
      return await uploadToCloud(localPath).url;
    });
    const newDocs = await Promise.all(docs);
    uploadedDocs = [...uploadedDocs, ...newDocs]; // Can't afford to loose previously uploaded docs
  }

  assignment.docs = uploadedDocs;

  assignment.title = title || assignment.title;
  assignment.description = description || assignment.description;
  assignment.due_date = due_date || assignment.due_date;

  await assignment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, assignment, "Assignment Updates Successfully"));
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const { assignmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
    throw new ApiError(400, "Invalid Assignment ID.");
  }

  const assignment = await Assignment.findOne({
    _id: assignmentId,
    user: req.user._id,
  });
  // Validation Again 💀
  if (!assignment) {
    throw new ApiError(404, "Assignment not found or unauthorized access");
  }

  // Remove files from Cloudinary
  if (assignment.docs.length > 0) {
    const deleteFilePromises = assignment.docs.map(async (fileUrl) => {
      try {
        const publicId = fileUrl.split("/").pop().split(".")[0]; // Extract public ID (got this from stackoverflow)
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to delete file: ${fileUrl}`, error);
      }
    });
    await Promise.all(deleteFilePromises);
  }

  await Assignment.findByIdAndDelete(assignmentId);

  return res.status(200).json(new ApiResponse(200, {}, "Khatam tata bye bye"));
});

export { createAssignment, getUserAssignments, updateAssignment, deleteAssignment };
