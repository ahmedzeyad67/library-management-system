import { body, query } from "express-validator";

function isValidISBN(value) {
  const isbn = value.replace(/[-\s]/g, "");

  // ISBN-10
  if (/^\d{9}[\dX]$/.test(isbn)) {
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      const digit = isbn[i] === "X" ? 10 : Number(isbn[i]);
      sum += digit * (10 - i);
    }

    return sum % 11 === 0;
  }

  // ISBN-13
  if (/^\d{13}$/.test(isbn)) {
    let sum = 0;

    for (let i = 0; i < 13; i++) {
      const digit = Number(isbn[i]);
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }

    return sum % 10 === 0;
  }

  return false;
}

const bookFieldsValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be between 2 and 50 characters long"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 2, max: 25 })
    .withMessage("Author name must be between 2 and 25 characters long"),
  body("isbn")
    .trim()
    .notEmpty()
    .withMessage("ISBN is required")
    .custom((value) => {
      if (!isValidISBN(value)) {
        throw new Error("Invalid ISBN format");
      }
      return true;
    }),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ max: 25 })
    .withMessage("Category must be at most 25 characters long"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters long"),
  body("publishedYear")
    .notEmpty()
    .withMessage("Published year is required")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),
  body("totalCopies")
    .isInt({ min: 1 })
    .withMessage("Total copies must be at least 1"),
  body("availableCopies")
    .isInt({ min: 0 })
    .withMessage("Available copies must be a reasonable number")
    .custom((value, { req }) => {
      if (value > req.body.totalCopies) {
        throw new Error("Available copies cannot exceed total copies");
      }
      return true;
    }),
];

const getBooks = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a positive integer between 1 and 100"),
];
const createBook = [...bookFieldsValidation];
const updateBook = [...bookFieldsValidation];

export default {
  getBooks,
  createBook,
  updateBook,
};
