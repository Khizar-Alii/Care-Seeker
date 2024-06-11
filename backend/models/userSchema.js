import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"]
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Job Seeker", "Employer"],
  },
  company: {
    type: String,
    default : ""
  },
  bio: {
    type: String,
    required: [true, "Describe Yourself"],

  },
  des: {
    type: String,
    required: [true, "Tell us about Yourself"],
  },
  location: {
    type: String,
    required: [true, "Please provide your current Address"],
  },
  education: [
    {
      institution: {
        type: String
      },
      from: {
        type: String
      },
      to: {
        type: String
      },
    },
  ],
  experience: [
    {
      company: {
        type: String
      },
      role: {
        type: String
      },
      from: {
        type: String
      },
      to: {
        type: String
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "jwt-secret", {
    expiresIn: "7d",
  });
};

export const User = mongoose.model("User", userSchema);
