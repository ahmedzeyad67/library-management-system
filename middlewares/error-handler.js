import AppError from "../utils/app-error.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === "CastError") {
    error = new AppError("Invalid ID", 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");

    error = new AppError(message, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    error = new AppError(`${field} already exists`, 409);
  }

  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Internal server error",
  });
};

export default errorHandler;
