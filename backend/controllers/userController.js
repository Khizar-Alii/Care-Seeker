import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/Error.js";
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt"

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role, company, bio, des, location, education, experience } = req.body;

  if (!name || !email || !phone || !password || !role || !bio || !des || !location) {
    return next(new ErrorHandler("Please fill the complete form!", 400));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    company,
    bio,
    des,
    location,
    education,
    experience,
  });

  sendToken(user, 201, res, "User Registered!");
});

// export const login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role) {
//     return next(new ErrorHandler("Please provide email, password, and role.", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return next(new ErrorHandler("Invalid Email Or Password.", 400));
//   }

//   const isPasswordMatched = await user.comparePassword(password);

//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid Email Or Password.", 400));
//   }

//   if (user.role !== role) {
//     return next(new ErrorHandler(`User with provided email and ${role} role not found!`, 404));
//   }

//   sendToken(user, 201, res, "User Logged In!");
// });



export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    return next(new ErrorHandler("Please provide email, password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // if (user.role !== role) {
  //   return next(new ErrorHandler(`User with provided email and ${role} role not found!`, 404));
  // }

  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile Controller
// export const updateProfile = catchAsyncErrors(async (req, res, next) => {
//   const { name, email, phone, role, company, bio, des, location, education, experience } = req.body;

//   // Prepare updated data excluding the password
//   const newUserData = {
//     name,
//     email,
//     phone,
//     company,
//     bio,
//     des,
//     location,
//     education,
//     experience,
//   };

//   // Find and update the user, exclude password from updates
//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     omitUndefined: true,
//   });

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });














export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name,  phone, company, bio, des, location, education, experience } = req.body;

  try {
    // Prepare updated data excluding the password
    const newUserData = {
      name,
      // email,
      phone,
      company,
      bio,
      des,
      location,
      education,
      experience,
    };

    // Find and update the user, exclude password from updates
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      // runValidators: true,
      // omitUndefined: true,
    });

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    next(new ErrorHandler("Error updating profile", 500));
  }
});