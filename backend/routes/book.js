import express from "express";
import dotenv from "dotenv";
import path from "path";

import { Book } from "../models/bookModel.js";
import { 
  validateBook, 
  formatBook, 
  endpointCalled, 
  saveBookImage,
  getBookImage,
  deleteBookImage, 
  deleteBookDirectory
} from "../shared/index.js";

import createBook from "./services/createBook.js";

const bookRouter = express.Router();
dotenv.config();

const UPLOADS_DIR = process.env.UPLOADS_DIR;
const BOOK_COVERS_DIR = `${ UPLOADS_DIR }/books/`;

// bookRouter.post("/", async (req, res) => {
//   endpointCalled("/book POST");

//   try {
//     if (!validateBook( req.body )) {
//       res.status(400).send({ created: false, error: "Invalid book data", book: undefined });
//       return;
//     }

//     const newBook = formatBook(req.body);

//     // Save the relative path to the image in the database
//     newBook.imagePath = await saveBookImage( newBook.image, newBook.title );

//     const book = await Book.create( newBook );

//     return res.status(201).send({ created: true, error: null, book: book });

//   } catch (error) {
//     console.log(`
//     Error creating book

//     ${error}
//     `);
//     res.status(500).send({ error: "Error creating book", book: undefined });
//   }
// });

bookRouter.post("/", createBook);

bookRouter.get("/:id", async (req, res) => {
  endpointCalled("/book/:id GET");

  try {
    const { id } = req.params;
    const book = await Book.findById( id );

    if (!book) {
      return res.status(404).send({ error: "Book not found", book: undefined });
    }

    const { serializedImage } = await getBookImage( book.imagePath );

    const bookWithImage = {
      ...book.toObject(),
      image: serializedImage,
    };

    return res.status(200).send({ error: null, book: bookWithImage });

  } catch (error) {
    console.log(`
    Error getting book

    ${error}
    `);
    res.status(500).send({ error: "Error getting book", book: undefined });
  }
});

bookRouter.put("/:id", async (req, res) => {
  endpointCalled("/book/:id PUT");

  try {
    const { id } = req.params;
    const book = await Book.findById( id );

    if (!validateBook(req.body)) {
      res.status(400).send({ error: "Invalid book data", data: null });
      return;
    }

    if (!book) {
      return res.status(404).send({ error: "Book not found", data: null });
    }

    deleteBookImage( path.join(BOOK_COVERS_DIR, book.imagePath) );

    const updatedBook = formatBook(req.body);

    updatedBook.imagePath = await saveBookImage( updatedBook.image, updatedBook.title );

    const updated = await Book.findByIdAndUpdate( id, updatedBook );

    if (!updated) {
      return res.status(404).send({ updated: false, error: "something went wrong", data: null });
    }

    return res.status(200).send({ updated: true, error: null, data: updated });

  } catch (error) {
    console.log(`
    Error updating book

    ${error}
    `);
    res.status(500).send({ error: "Error updating book", data: null });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  endpointCalled("/book/:id DELETE");
  
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).send({ deleted: false, error: "Book not found", data: null });
    }
    const result = await Book.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).send({ deleted: false, error: "Book not found", data: null });
    }

    const imagePath = path.join(BOOK_COVERS_DIR, book.imagePath);
    deleteBookImage(imagePath);

    const bookDir = path.join(BOOK_COVERS_DIR, book.title.replace(/\s/g, '_'));
    deleteBookDirectory(bookDir);

    return res.status(200).send({ deleted: true, error: null, data: result });

  } catch (error) {
    console.log(`
    Error deleting book

    ${error}
    `);
    res.status(500).send({ error: "Error deleting book", data: null });
  }
});

export default bookRouter;