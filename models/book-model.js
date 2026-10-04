import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 25,
      trim: true,
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      maxlength: 25,
      trim: true,
    },

    publishedYear: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear(),
    },

    totalCopies: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    coverImage: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model("Book", bookSchema);
