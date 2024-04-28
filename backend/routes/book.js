import express from "express";

import { Book } from "../models/bookModel.js";
import { validateBook, formatBook } from "../shared/index.js";

const bookRouter = express.Router();

bookRouter.post("/", async (req, res) => {
  try {

    if (!validateBook( req.body )) {
      res.status(400).send({ created: false, error: "Invalid book data", data: null });
      return;
    }

    const newBook = formatBook(req.body);

    const book = await Book.create( newBook );

    return res.status(201).send({ created: true, error: null, data: book });

  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({ error: "Error creating book", data: null });
  }
});

bookRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById( id );

    if (!book) {
      return res.status(404).send({ error: "Book not found", data: null });
    }

    return res.status(200).send({ error: null, data: book });

  } catch (error) {
    console.log("Error getting book", error);
    res.status(500).send({ error: "Error getting book", data: null });
  }
});

bookRouter.put("/:id", async (req, res) => {
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
    console.log("Error updating book", error);
    res.status(500).send({ error: "Error updating book", data: null });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete( id );
    
    if (!result) {
      return res.status(404).send({ deleted: false, error: "Book not found", data: null });
    }

    return res.status(200).send({ deleted: true, error: null, data: result });

  } catch (error) {
    console.log("Error deleting book", error);
    res.status(500).send({ error: "Error deleting book", data: null });
  }
});

export default bookRouter;