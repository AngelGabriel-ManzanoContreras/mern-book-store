import { Book } from "../../models/bookModel.js";
import { endpointCalled } from "../../shared/index.js";
import { validateBook, formatBook, saveBookImage } from "../../shared/index.js";

export default async function createBook(req, res) {
    endpointCalled("/book POST");
  
    try {
      if (!validateBook( req.body )) {
        res.status(400).send({ created: false, error: "Invalid book data", book: undefined });
        return;
      }
  
      const newBook = formatBook(req.body);
  
      // Save the relative path to the image in the database
      newBook.imagePath = await saveBookImage( newBook.image, newBook.title );
  
      const book = await Book.create( newBook );
  
      return res.status(201).send({ created: true, error: null, book: book });
  
    } catch (error) {
      console.log(`
      Error creating book
  
      ${error}
      `);
      res.status(500).send({ error: "Error creating book", book: undefined });
    }
};