// Custom Error messages to use throughout the app for consistent logs

class ApiError extends Error {
    // Default Response
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    // No need for error to return data
    this.data = null;
    this.message = message;
    // ofcourse it's not success
    this.success = false;
    this.errors = errors;


    // Good practice to also return stack trace for debugging
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
