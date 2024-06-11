import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./Error.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, "jwt-secret");

  req.user = await User.findById(decoded.id);

  next();
});
