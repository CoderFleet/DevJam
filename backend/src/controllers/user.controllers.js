import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadToCloud } from "../utils/cloudinary.js";

const register = asyncHandler(async (req, res) => {
  // Get Data from req.body
  const { fullName, username, email, password } = req.body;

  if ([fullName, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "Fill all fields");
  }

  // Check if all fields are present
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  // Return if user is already present
  if (existedUser) {
    throw new ApiError(409, "User Credentials Already Exists...");
  }

  const localPath = req.file?.path;
  if (!localPath) {
    throw new ApiError(400, "Avatar File is Required...");
  }

  console.log(localPath);
  // Otherwise register the user and save details in database
  const avatar = await uploadToCloud(localPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar Couldn't be Saved...");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const userFromDB = await User.findById(user._id).select(
    "-password -refresh-token"
  );

  // Returned Created user and message
  return res
    .status(201)
    .json(new ApiResponse(200, userFromDB, "User Ban Gaya 🤩!"));
});


export { register };
