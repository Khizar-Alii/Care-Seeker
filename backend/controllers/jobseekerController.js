// controllers/jobSeekerController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { JobSeeker } from "../models/jobSeekerProfileSchema.js";
import ErrorHandler from "../middlewares/Error.js";

// Create Job Seeker Profile
export const createProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, bio, location, des, education, experience } =
    req.body;

  if (!name || !email || !phone || !location) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const jobSeeker = await JobSeeker.create({
    name,
    email,
    phone,
    location,
    bio,
    des,
    education,
    experience,
  });

  res.status(200).json({
    success: true,
    message: "Profile Created!",
    jobSeeker,
  });
});

// Get All Job Seekers
export const getAllJobSeekers = catchAsyncErrors(async (req, res, next) => {
  const jobSeekers = await JobSeeker.find({});
  res.status(200).json({
    success: true,
    jobSeekers,
  });
});

// Update Job Seeker Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, bio, location, des, education, experience } =
    req.body;

  let jobSeeker = await JobSeeker.findById(id);
  if (!jobSeeker) {
    return next(new ErrorHandler("Job Seeker not found!", 404));
  }

  jobSeeker.name = name || jobSeeker.name;
  jobSeeker.email = email || jobSeeker.email;
  jobSeeker.phone = phone || jobSeeker.phone;
  jobSeeker.location = location || jobSeeker.location;
  jobSeeker.bio = bio || jobSeeker.bio;
  jobSeeker.des = des || jobSeeker.des;
  jobSeeker.education = education || jobSeeker.education;
  jobSeeker.experience = experience || jobSeeker.experience;

  await jobSeeker.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    jobSeeker,
  });
});

// Delete Job Seeker Profile
export const deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Use findOneAndDelete to remove the job seeker by ID
  const result = await JobSeeker.findOneAndDelete({ _id: id });

  if (!result) {
    return next(new ErrorHandler("Job Seeker not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile Deleted!",
  });
});
