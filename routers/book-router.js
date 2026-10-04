import { Router } from "express";
import booksController from "../controllers/book-controller.js";
import booksValidator from "../validators/book-validator.js";
import validate from "../middlewares/validate.js";

const router = Router();

router
  .route("/")
  .get(booksValidator.getBooks, validate, booksController.getAllBooks)
  .post(booksValidator.createBook, validate, booksController.createBook);

router
  .route("/:bookId")
  .get(validate, booksController.getBookById)
  .put(booksValidator.updateBook, validate, booksController.updateBook)
  .delete(validate, booksController.deleteBook);

export default router;
