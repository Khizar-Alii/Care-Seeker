// models/jobSeekerProfileSchema.js
import mongoose from "mongoose";
import validator from "validator";

const jobSeekerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name"],
      minLength: [3, "Name must contain at least 3 Characters"],
      maxLength: [30, "Name cannot exceed 30 Characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your Phone Number"],
    },
    location: {
      type: String,
      required: [true, "Please specify your Location (City, Country)!"],
    },
    bio: {
      type: String,
    },
    des: {
      type: String,
    },
    education: [
      {
        institution: {
          type: String,
          required: [true, "Please enter the name of the Institution"],
        },
        from: {
          type: Date,
          required: [true, "Please enter the start date"],
        },
        to: {
          type: String,
          required: [true, "Please enter the end date"],
        },
      },
    ],
    experience: [
      {
        company: {
          type: String,
          required: [true, "Please enter the name of the Company"],
        },
        role: {
          type: String,
          required: [true, "Please enter your Role"],
        },
        from: {
          type: Date,
          required: [true, "Please enter the start date"],
        },
        to: {
          type: String,
          required: [true, "Please enter the end date"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);