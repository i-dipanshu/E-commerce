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
  const isPasswordCorrect = user.comparePassword(password);

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
})