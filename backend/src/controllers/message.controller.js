import { User } from "../models/user.models.js";
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

export { getUsers };
