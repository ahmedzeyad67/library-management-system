import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      data: {
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      },
    });
  }

  next();
};

export default validate;
