import { User } from "../models/user.models.js";
import Message from "../models/message.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloud } from "../utils/cloudinary.js";

const getUsers = asyncHandler(async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    // Get all users except the logged in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");

    if (!filteredUsers) {
      return res.status(404).json(new ApiResponse(404, null, "No users found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, filteredUsers, "Users fetched"));
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    throw new ApiError(500, "Something went wrong while fetching users");
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const receiverId = req.params.id;

    // Fetching messages
    const messages = await Message.find({
      $or: [
        { sender: loggedUserId, receiver: receiverId },
        { sender: receiverId, receiver: loggedUserId },
      ],
    }).sort({ createdAt: 1 });

    if (!messages) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No messages found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched"));
  } catch (error) {
    console.error("Error in getMessages: ", error.message);
    throw new ApiError(500, "Something went wrong while fetching messages");
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const receiverId = req.params.id;
    const { text } = req.body;

    let doc = null;
    const file = req.file;
    if (file) {
      const localPath = file.path;
      doc = await uploadToCloud(localPath);

      if (!doc) {
        throw new ApiError(400, "File couldn't be saved");
      }
    }

    const message = await Message.create({
      sender: loggedUserId,
      receiver: receiverId,
      text,
      doc: doc ? doc.url : null,
    });

    if (!message) {
      throw new ApiError(400, "Message couldn't be saved");
    }

    return res.status(201).json(new ApiResponse(201, message, "Message sent"));
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    throw new ApiError(500, "Something went wrong while sending message");
  }
});

export { getUsers, getMessages, sendMessage };