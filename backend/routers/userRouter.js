import express from 'express'
import { getUser, login, logout, register,updateProfile,forgotpassword} from "../controllers/userController.js"
import {isAuthorized} from "../middlewares/auth.js"

const router = express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/forgotpassword",forgotpassword)
router.get("/logout",isAuthorized,logout)
router.get("/getuser",isAuthorized,getUser)
router.put('/update', isAuthorized, updateProfile);

export default router