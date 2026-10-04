import Book from "../models/book-model.js";
import AppError from "../utils/app-error.js";
import paginate from "../utils/pagination.js";

const getAllBooks = async (queryParams) => {
  const { page, limit, ...query } = queryParams;

  const data = await paginate(Book, query, { page, limit });

  return data;
};

const getBookById = async (bookId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return book;
};

const createBook = async (bookData) => {
  const newBook = new Book(bookData);
  await newBook.save();

  return newBook;
};

const updateBook = async (bookId, bookData) => {
  const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBook) {
    throw new AppError("Book not found", 404);
  }

  return updatedBook;
};

const deleteBook = async (bookId) => {
  const book = await Book.findByIdAndDelete(bookId);

  if (!book) {
    throw new AppError("Book not found", 404);
  }
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
