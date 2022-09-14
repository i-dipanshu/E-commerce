import handleAsyncErrors from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// model import
import User from "../models/user.js";
import token  from "../utils/tokenGenerator.js";

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
    if(!email || !password ){
        return next(new ErrorHandler(400, "Please enter a valid Email or Password."));
    }

    // if both are present, search for the user in database
    const user = await User.findOne({email}).select("+password");

    // if email doesn't exist in database
    if(!user){
        return next(new ErrorHandler(401, "Please a enter a valid Email or Password."));
    }

    // matching the passwords
    const isPasswordCorrect = user.comparePassword(password);

    // if password doesn't match
    if(!isPasswordCorrect){
        return next(new ErrorHandler(401, "Please enter a valid Email or Password."))
    }

    // creating a JWT token and cookie --> sending a response
    token(user, 200, res);
});

/* ------------------------------------------------------------------------------------------------------------------- */