import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const bookRouter = express.Router();
dotenv.config();

import { Book } from "../models/bookModel.js";
import { validateBook, formatBook, createDirectoryIfNotExists, endpointCalled } from "../shared/index.js";
const UPLOADS_DIR = process.env.UPLOADS_DIR;
const BOOK_COVERS_DIR = `${ UPLOADS_DIR }/books/`;

bookRouter.post("/", async (req, res) => {
  endpointCalled("/books POST");

  try {

    if (!validateBook( req.body )) {
      res.status(400).send({ created: false, error: "Invalid book data", data: null });
      return;
    }

    const newBook = formatBook(req.body);

    // Create a directory for the book if it doesn't exist
    const bookDir = path.join(BOOK_COVERS_DIR, newBook.title.replace(/\s/g, '_')); // Replace spaces in title with underscores
    createDirectoryIfNotExists(bookDir);

    console.log('bookDir', bookDir)

    const matches = req.body.image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid image data");
    }

    const imageExtension = matches[1].split('/')[0];
    const imageData = Buffer.from(matches[2], 'base64');

    // Save the image file to the book's directory with the correct extension
    const imageFileName = `${Date.now()}-${req.body.title.replace(/\s/g, '_')}.${imageExtension}`;
    const imagePath = path.join(bookDir, imageFileName);
    fs.writeFileSync(imagePath, imageData);

    console.log('imagePath', imagePath)

    // Save the relative path to the image in the database
    newBook.imagePath = path.relative(BOOK_COVERS_DIR, imagePath);

    const book = await Book.create( newBook );

    return res.status(201).send({ created: true, error: null, data: book });

  } catch (error) {
    console.log(`
    Error creating book

    ${error}
    `);
    res.status(500).send({ error: "Error creating book", data: null });
  }
});

bookRouter.get("/:id", async (req, res) => {
  endpointCalled("/books/:id GET");

  try {
    const { id } = req.params;
    const book = await Book.findById( id );

    if (!book) {
      return res.status(404).send({ error: "Book not found", data: null });
    }

    return res.status(200).send({ error: null, data: book });

  } catch (error) {
    console.log(`
    Error getting book

    ${error}
    `);
    res.status(500).send({ error: "Error getting book", data: null });
  }
});

bookRouter.put("/:id", async (req, res) => {
  endpointCalled("/books/:id PUT");

  try {
    const { id } = req.params;
    const book = await Book.findById( id );

    if (!book) {
      return res.status(404).send({ error: "Book not found", data: null });
    }

    if (!validateBook(req.body)) {
      res.status(400).send({ error: "Invalid book data", data: null });
      return;
    }

    const updatedBook = formatBook(req.body);

    const updated = await Book.findByIdAndUpdate( id, updatedBook );

    if (!updated) {
      return res.status(404).send({ updated: false, error: "Book not found", data: null });
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
  endpointCalled("/books/:id DELETE");
  
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete( id );
    
    if (!result) {
      return res.status(404).send({ deleted: false, error: "Book not found", data: null });
    }

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