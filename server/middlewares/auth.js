import jwt from "jsonwebtoken";
import User from "../models/user.js";
import handleAsyncErrors from "./asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

/* ------------------------------------------------------------------- */

// determines whether the user is logged in or not
export const isUserAuthenticated = handleAsyncErrors(async (req, res, next) => {

  // destructure token from  cookies from request
  const { token } = req.cookies;

  // if cookie not found
  if (!token) {
    return next(new ErrorHandler(401, "Please login to access this resource."));
  }

  // decode the cookies (or token)
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // find the user using id from decodedData and store the user in req.user
  req.user = await User.findById(decodedData.id);

  // calling next functions
  next();
});

/* ------------------------------------------------------------------- */

// it verifies a user is admin or not
export const isRole = (...roles) => {
  return (req, res, next) => {
    // if role is other than admin
    // req.user.role --> pulling role from user stored request
    // available only if isAuthenticated has already run
    // because that appends the user to request 
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} can't access this resource`
        )
      );
    }

    // and if role is admin
    next();
  };
};

/* ------------------------------------------------------------------- */
