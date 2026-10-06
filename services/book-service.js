import Book from "../models/book-model.js";
import AppError from "../utils/app-error.js";
import paginate from "../utils/pagination.js";

const getActiveBooks = async (queryParams) => {
  const { page, limit, sort, order, search, ...query } = queryParams;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }

  return paginate(
    Book,
    { ...query, isActive: true },
    { page, limit, sort, order },
  );
};

const getAllBooks = async (queryParams) => {
  const { page, limit, sort, order, search, ...query } = queryParams;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }

  return paginate(Book, query, { page, limit, sort, order });
};

const getBookById = async (bookId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return book;
};

const createBook = async (bookData) => {
  const newBook = new Book(...bookData, {
    availableCopies: bookData.totalCopies,
  });
  await newBook.save();

  return newBook;
};

const updateBook = async (bookId, bookData) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  if (bookData.totalCopies !== undefined) {
    const borrowedCopies = book.totalCopies - book.availableCopies;

    if (bookData.totalCopies < borrowedCopies) {
      throw new AppError(
        `Total copies cannot be less than borrowed copies (${borrowedCopies})`,
        400,
      );
    }

    book.totalCopies = bookData.totalCopies;
    book.availableCopies = bookData.totalCopies - borrowedCopies;
  }

  Object.assign(book, bookData);
  await book.save();

  return book;
};

const updateBookStatus = async (bookId, isActive) => {
  const book = await Book.findByIdAndUpdate(
    bookId,
    { isActive },
    { returnDocument: "after", runValidators: true },
  );

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return book;
};

const deactivateBook = async (bookId) => {
  return updateBookStatus(bookId, false);
};

const activateBook = async (bookId) => {
  return updateBookStatus(bookId, true);
};

export default {
  getActiveBooks,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  activateBook,
  deactivateBook,
};
