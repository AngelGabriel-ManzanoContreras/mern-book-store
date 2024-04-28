import dotenv from "dotenv";
import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";

import bookRouter from "./routes/book.js";
import booksRouter from "./routes/books.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;
const mongoDBURL_1 = process.env.MONGO_DB_URL_PART_1;
const mongoDBURL_2 = process.env.MONGO_DB_URL_PART_2;
const pass = process.env.MONGO_DB_PASSWORD;
const mongoDBURL = `${ mongoDBURL_1 }${ pass }${ mongoDBURL_2 }`;

const app = express();

app.use(bodyParser.json({limit: '35mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  }),
);

app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    allowedHeaders: [ "Content-Type" ]
  }
));

app.use("/book", bookRouter);
app.use("/books", booksRouter);

const startServer = async () => {
  app.listen(PORT, () => {
    try {
      console.log(`Server listening on port ${PORT}`);
    } catch (error) {
      console.log(`
      Error starting server

      ${error}
      `);
    }
  });
}

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    startServer();
  }).catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.status(200).send({ error: null, data: "Book store web app online" });
});