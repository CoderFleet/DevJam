// Higher Order function to handle asynchronous calls and errors
// This will be used to call functions that require time and need to be called asynchronously

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
