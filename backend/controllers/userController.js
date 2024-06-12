import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/Error.js";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// Register Controller

export const register = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    confirmPassword,
    role,
    company,
    bio,
    des,
    location,
    education,
    experience,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword ||
    !bio ||
    !des ||
    !location
  ) {
    return next(new ErrorHandler("Please fill the complete form!", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return next(new ErrorHandler("Profile File Required!", 400));
  // }
  // const { image } = req.files;
  // const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  // if (!allowedFormats.includes(image.mimetype)) {
  //   return next(
  //     new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
  //   );
  // }
  // const cloudinaryResponse = await cloudinary.uploader.upload(
  //   image.tempFilePath
  // );

  // if (!cloudinaryResponse || cloudinaryResponse.error) {
  //   console.error(
  //     "Cloudinary Error:",
  //     cloudinaryResponse.error || "Unknown Cloudinary error"
  //   );
  //   return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  // }

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
    // image: {
    //   public_id: cloudinaryResponse.public_id,
    //   url: cloudinaryResponse.secure_url,
    // },
  });

  sendToken(user, 201, res, "User Registered!");
});

// Login Controller

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
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

  sendToken(user, 201, res, "User Logged In!");
});

// Logout Controller

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

//  Update Controller

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, phone, company, bio, des, location } = req.body;
  let education = req.body.education;
  let experience = req.body.experience;

  if (education) {
    try {
      education = JSON.parse(education);
    } catch (error) {
      return next(new ErrorHandler("Invalid education format", 400));
    }
  }

  if (experience) {
    try {
      experience = JSON.parse(experience);
    } catch (error) {
      return next(new ErrorHandler("Invalid experience format", 400));
    }
  }

  const newUserData = {
    name,
    phone,
    company,
    bio,
    des,
    location,
    education,
    experience,
  };

  if (req.files && req.files.image) {
    const { image } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(image.mimetype)) {
      return next(
        new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
      );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed to upload image to Cloudinary", 500)
      );
    }

    newUserData.image = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  try {
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
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