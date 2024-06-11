// routes/jobSeekerRoutes.js
import express from "express";
import {
  createProfile,
  getAllJobSeekers,
  updateProfile,
  deleteProfile,
} from "../controllers/jobSeekerController.js";

const router = express.Router();

// Create Job Seeker Profile
router.post("/profile/create", createProfile);

// Get All Job Seekers
router.get("/all", getAllJobSeekers);

// Update Job Seeker Profile
router.patch("/:id/profile/update", updateProfile);

// Delete Job Seeker Profile
router.patch("/:id/profile/delete", deleteProfile);

export default router;