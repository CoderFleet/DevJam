import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadToCloud } from "../utils/cloudinary.js";

const generateAccessRefreshTokens = async (userId) => {
  try {
    // Generate Access and Refresh Tokens
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save Refresh Token in Database
    user.refreshToken = refreshToken;
    // Save User
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

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

const login = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  // Validation
  if (!username && !email) {
    throw new ApiError(400, "username or password is required");
  }

  // find user in database
  const user = await User.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (!user) {
    throw new ApiError(404, "requested User doesn't even exist");
  }

  // Check if password is correct
  const valid = await user.isPasswordCorrect(password);
  if (!valid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Generate Access and Refresh Tokens
  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    user._id
  );

  // Send Access and Refresh Tokens as Cookies
  const loggedUserFromDB = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  // Return Logged In User and Tokens
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUserFromDB,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

export { register, login };
