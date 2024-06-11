// models/EmployerProfileSchema.js
import mongoose from "mongoose";
import validator from "validator";

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    minLength: [3, "Name must contain at least 3 Characters"],
    maxLength: [30, "Name cannot exceed 30 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  phone: {
    type: String, // Ensure phone is a string to match the request body
    required: [true, "Please enter your Phone Number"],
  },
  company: {
    type: String,
    required: [true, "Please enter your Company Name"],
  },
  bio: {
    type: String,
  },
  des: {
    type: String,
    required: [true, "Describe Yourself"],
  },
  location: {
    type: String,
    required: [true, "Please specify your Location (City, Country)!"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Employer = mongoose.model("Employer", employerSchema);