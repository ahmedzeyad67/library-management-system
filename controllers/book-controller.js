import asyncWrapper from "../middlewares/async-wrapper.js";
import bookService from "../services/book-service.js";

const getAllBooks = asyncWrapper(async (req, res) => {
  const data = await bookService.getAllBooks(req.query);

  res.json({
    status: "success",
    data,
  });
});

const getBookById = asyncWrapper(async (req, res) => {
  const book = await bookService.getBookById(req.params.bookId);

  res.json({ status: "success", data: { book } });
});

const createBook = asyncWrapper(async (req, res) => {
  const newBook = await bookService.createBook(req.body);

  res.status(201).json({ status: "success", data: { book: newBook } });
});

const updateBook = asyncWrapper(async (req, res) => {
  const updatedBook = await bookService.updateBook(req.params.bookId, req.body);

  res.json({ status: "success", data: { book: updatedBook } });
});

const deleteBook = asyncWrapper(async (req, res) => {
  await bookService.deleteBook(req.params.bookId);

  res.json({ status: "success", data: null });
});

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
