// extending Error class
class ErrorHandler extends Error {
  // passing params to constructor
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
