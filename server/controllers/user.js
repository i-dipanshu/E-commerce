import handleAsyncErrors from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/email.js";
import crypto from 'crypto';

// model import
import User from "../models/user.js";
import token from "../utils/tokenGenerator.js";

/* ----------------------------------------------------------------------------------------------------------------- */

// Register a new user

export const createNewUser = handleAsyncErrors(async (req, res, next) => {
  // desturct name, email and password from request body
  const { name, email, password } = req.body;

  // create a new user with the above feilds ( or objects)
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "sample_id", url: "sample_url" },
  });

  // creating a JWT token and cookie --> sending a response
  token(user, 201, res);
});

/* ------------------------------------------------------------------------------------------------------------------- */

// Login a user

export const loginUser = handleAsyncErrors(async (req, res, next) => {
  // destruct email and password from request body
  const { email, password } = req.body;

  // checking if both email and password are present
  if (!email || !password) {
    return next(
      new ErrorHandler(400, "Please enter a valid Email or Password.")
    );
  }

  // if both are present, search for the user in database
  const user = await User.findOne({ email }).select("+password");

  // if email doesn't exist in database
  if (!user) {
    return next(
      new ErrorHandler(401, "Please a enter a valid Email or Password.")
    );
  }

  // matching the passwords
  const isPasswordCorrect = await user.comparePassword(password);

  // if password doesn't match
  if (!isPasswordCorrect) {
    return next(
      new ErrorHandler(401, "Please enter a valid Email or Password.")
    );
  }

  // creating a JWT token and cookie --> sending a response
  token(user, 200, res);
});

/* ------------------------------------------------------------------------------------------------------------------- */

// Logout a logged in user

export const logoutUser = handleAsyncErrors((req, res, next) => {
  // force expire the duration of cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: false,
  });

  // response
  res.status(200).json({success: true, message: "Logged Out Successfully"})
});

/* ------------------------------------------------------------------------------------------------------------------- */

// ForgotPassword

export const forgotPassword = handleAsyncErrors(async (req, res, next) => {
  // finding the user by email from request body
  const user = await User.findOne({email:req.body.email});

  // if user not found
  if(!user){
    return next(new ErrorHandler(404, "No User is linked to this email."));
  }

  // if user found --> generate a resetPasswordToken for that user
  const resetToken = await user.getResetPasswordToken();

  console.log(resetToken);

  // saving the user document 
  await user.save({validateBeforeSave: false});

  // url to resetPassword htttp://
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  // message to email 
  const message = `Your password reset token is: \n\n ${resetUrl}  \n\n Please ignore if you have not requested this email.`;

  // try-catch 
  try {
    await sendEmail({email: user.email, subject: `${process.env.WEBSITE_NAME} Password Recovery `, message});
    res.status(200).json({success: true, message: `Email sent to ${user.email} successfully.`})
  } catch (error) {
    // if error unchage the above changed feilds
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // save the document 
    await user.save({validateBeforeSave: false});

    // handle error
    next(new ErrorHandler(500, error.message));

  }
});

/* ------------------------------------------------------------------------------------------- */

// reset Password

export const resetPassword = handleAsyncErrors(async(req, res, next) => {
  // creating hash from the token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  // finding the user with hashed token and checking it authentication
  const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}});

  // if user not found
  if(!user){
    return next(new ErrorHandler(400, "Reset Password token is invalid or expired."))
  }

  // if password and confirm password are not same
  if(!req.body.password === req.body.confirmPassord){
    return next(new ErrorHandler(400, "Password doesn't match"))
  }

  // if everything is successfull then change the user password
  user.password = req.body.password;
  
  // and remove the resetPasswordToken
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // save the updated user 
  await user.save({validateBeforeSave: false});

  // login the user with new jwt token
  token(user, 200, res);
});

/* ---------------------------------------------------------------------------------------- */

// get user details -- login required
export const getUserDetails = handleAsyncErrors(async(req, res, next) => {
  // find the user from id stored in req.user
  const user = await User.findById(req.user.id);

  // response
  res.status(200).json({success: true, user});
});

/* ------------------------------------------------------------------------------------------ */

// update password -- login required
export const updatePassword = handleAsyncErrors(async(req, res, next) => {
  // destruct passwords from req.body
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // find the user by id in req.user and append the password alongwith  
  const user = await User.findById(req.user.id).select("+password");

  // compare the passwords
  const isPasswordMatched = await user.comparePassword(oldPassword);

  // if password does not match
  if(!isPasswordMatched){
    return next(new ErrorHandler(401, "Incorrect Password"));
  }

  // if password is matched, check for password and confirmPassword
  if(!newPassword === confirmPassword){
    return next(new ErrorHandler(400, "Password don't match, Try again"));
  }

  // if everything goes fine
  user.password = req.body.newPassword;

  // save after updating
  await user.save();

  // login and send token
  token(user, 200, res);
});

/* ------------------------------------------------------------------------------------------------- */

// user profile update -- login required
export const updateProfile = handleAsyncErrors(async(req, res, next) => {
  // new user data
  const newData = {name:req.body.name, email:req.body.email, };

  // find the user by id in req.user | update the existing data
  const user = await User.findByIdAndUpdate(req.user.id, newData, {new: true, runValidators: true, useFindAndModify: true});

  // response
  res.status(200).json({success: true, user});

});

/* ---------------------------------------   admin     ---------------------------------------*/


// get all users -- for admin
export const getAllUsers = handleAsyncErrors(async(req, res, next) => {
  // finding all the users
  const users = await User.find();

  // response
  res.status(200).json({success:true, users});
});

/* ------------------------------------------------------------------------------------------------- */

// get single user -- for admin
export const getUser = handleAsyncErrors(async(req, res, next) => {
  // find the user by id in req parameters
  const user = await User.findById(req.params.id);

  // if user not found
  if(!user){
    return next(new ErrorHandler(404, `User not found with id: ${req.params.id}`))
  }

  // if found
  res.status(200).json({success: true, user});
});

/* ------------------------------------------------------------------------------------------------- */

// user profile update -- login required -- admin
export const updateProfileAdmin = handleAsyncErrors(async(req, res, next) => {
  // new user data
  const newData = {name:req.body.name, email:req.body.email, role:req.body.role, };

  // find the user by id in req.user | update the existing data
  const user = await User.findByIdAndUpdate(req.params.id, newData, {new: true, runValidators: true, useFindAndModify: true});

  // if user not found
  if(!user){
    return next(new ErrorHandler(404, `User not found with id: ${req.params.id}`))
  }

  // response
  res.status(200).json({success: true, user});

});

/* -------------------------------------------------------------------------------------------------------- */

// delete a user -- admin
export const deleteUser = handleAsyncErrors(async(req, res, next) => {
  // find the user by id
  const user = await User.findByIdAndDelete(req.params.id);

  // if user not found
  if(!user){
    return next(new ErrorHandler(404, `User not found with id: ${req.params.id}`))
  }

  // if found then delete
  await user.remove();

  res.status(200).json({success: true, message: "User deleted Successfully"});
})