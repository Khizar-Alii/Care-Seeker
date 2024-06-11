// routes/employerRoutes.js
import express from "express";
import {
  createProfile,
  getAllEmployers,
  updateProfile,
  deleteProfile,
} from "../controllers/employerController.js";
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

// Create Employer Profile
router.post("/profile/create",isAuthorized, createProfile);

// Get All Employers
router.get("/:id/all", isAuthorized,getAllEmployers);

// Update Employer Profile
router.patch("/:id/profile/update",isAuthorized, updateProfile);

// Delete Employer Profile
router.patch("/:id/profile/delete",isAuthorized, deleteProfile);

export default router;
