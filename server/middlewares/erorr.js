import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb _id error
  if(err.name === "CastError"){
    const message = `Resource not found. Invalid ${err.path}`
    err = new ErrorHandler(400, message)
  }

  // response
  res.status(err.statusCode).json({
    success: false,
    message: err.message
    // err : err.stack
  });
};
