import { body, query } from "express-validator";

const getAllUsers = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a positive integer between 1 and 100"),
  query("sort")
    .optional()
    .isIn(["firstName", "lastName", "email", "createdAt"])
    .withMessage("Invalid sort field"),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc"),
  query("search").optional().trim(),
  query("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),
  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];

const updateMe = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage("First name must be between 2 and 25 characters long"),
  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage("Last name must be between 2 and 25 characters long"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .isLength({ max: 50 })
    .withMessage("Email must be at most 50 characters long"),
  body("phone")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Please enter a valid phone number")
    .isLength({ max: 20 })
    .withMessage("Phone number must be at most 20 characters long"),
  body()
    .custom((value) => Object.keys(value).length > 0)
    .withMessage("At least one field must be provided")
    .custom((value) => {
      const allowedFields = ["firstName", "lastName", "email", "phone"];

      return Object.keys(value).every((field) => allowedFields.includes(field));
    })
    .withMessage(
      "Only firstName, lastName, email, and phone fields are allowed",
    ),
];

export default {
  getAllUsers,
  updateMe,
};
