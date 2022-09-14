import jwt from 'jsonwebtoken'

import handleAsyncErrors from "./asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export default handleAsyncErrors(async (req, res, next) => {

    // storing cookies from request body
    const token = req.cookies;

    // if cookie not found
    if(!token){
        return next(new ErrorHandler(401, "Please login to access this resorces."))
    }

    // decode the cookies (or token)
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // storing id from decodedData in request body 
    req.body = await User.findById(decodedData.id);

    // calling next functions
    next();
});
