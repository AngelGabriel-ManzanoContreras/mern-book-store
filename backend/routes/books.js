import express from "express";

import { Book } from "../models/bookModel.js";
import { endpointCalled } from "../shared/functions.js";

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  endpointCalled("/books GET");

  try {
    const books = await Book.find({});

    return res.status(200).send({ error: null, books_count: books.length, books: books });

  } catch (error) {
    console.log(`
    Error getting books

    ${error}
    `);
    res.status(500).send({ error: "Error getting books", data: null });
  }
});

export default booksRouter;