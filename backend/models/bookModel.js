import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published_date: {
    type: Date,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  edition: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // imagePath: {
  //   type: String, // Store the relative path to the image
  //   required: true,
  // }
}, {
  timestamps: true,
})

export const Book = mongoose.model('Book', bookSchema);