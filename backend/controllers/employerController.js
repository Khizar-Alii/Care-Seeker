// controllers/employerController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Employer } from "../models/EmployerProfileSchema.js";
import ErrorHandler from "../middlewares/Error.js";

// Create Employer Profile
export const createProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, company, bio, des, location } = req.body;
  const user = req.user;
  if (!name || !email || !phone || !company || !des || !location) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const employer = await Employer.create({
    name,
    email,
    phone,
    company,
    bio,
    des,
    location,
    user: user._id,
  });

  res.status(200).json({
    success: true,
    message: "Profile Created!",
    employer,
  });
});

// Get All Employers profile
export const getAllEmployers = catchAsyncErrors(async (req, res, next) => {
  const employers = await Employer.find();
  res.status(200).json({
    success: true,
    employers,
  });
});

// Update Employer Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, company, bio, des, location } = req.body;

  let employer = await Employer.findById(id);
  if (!employer) {
    return next(new ErrorHandler("Employer not found!", 404));
  }

  // Ensure the logged-in user is the owner of the profile
  if (employer.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to update this profile.", 403)
    );
  }

  if (name) employer.name = name;
  if (email) employer.email = email;
  if (phone) employer.phone = phone;
  if (company) employer.company = company;
  if (bio) employer.bio = bio;
  if (des) employer.des = des;
  if (location) employer.location = location;

  await employer.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    employer,
  });
});

// Delete Employer Profile
export const deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Use findByIdAndDelete to delete the employer profile
  const result = await Employer.findByIdAndDelete(id);

  if (!result) {
    return next(new ErrorHandler("Employer not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile Deleted!",
  });
});
