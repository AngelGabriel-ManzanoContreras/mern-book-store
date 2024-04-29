import express from "express";

import { Book } from "../models/bookModel.js";
import { endpointCalled } from "../shared/functions.js";
import { getBookImage } from "../shared/fileHandling.js";

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  endpointCalled("/books GET");

  try {
    const books = await Book.find({});

    if (!books || books.length === 0) {
      return res.status(204).send({ error: "No books found", data: null });
    }

    const modifiedBooks = [];
    
    for (let book of books) {
      if ( !( book.imagePath ) ) continue; // Skip books without an image path

      const relativeImagePath = book.imagePath.replace(/\\/g, "/");
      const { serializedImage } = await getBookImage(relativeImagePath);

      const newBook = {
        ...book.toObject(),
        image: serializedImage,
      };

      modifiedBooks.push(newBook);
    }

    return res.status(200).send({ error: null, books_count: modifiedBooks.length, books: modifiedBooks });


  } catch (error) {
    console.log(`
    Error getting books

    ${error}
    `);
    res.status(500).send({ error: "Error getting books", data: null });
  }
});

export default booksRouter;