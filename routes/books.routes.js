const express = require("express");
const router = express.Router();
const axios = require("axios");
const Book = require("./../models/Book.model");

//CREATE BOOK
router.post("/create", (req, res) => {
  /* const id = req.payload._id */

  const { title, author, publisher, image, description } = req.body;

  Book.create({
    title,
    author,
    publisher,
    image,
    description,
  })
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Could not create book", err })
    );
});

//GET BOOKS LIST
router.get("/list", async (req, res) => {
  const allBooks = await Book.find();
  res.status(200).json(allBooks);
});

//READ BOOK Details
router.get("/details/:book_id", async (req, res) => {
  const { book_id } = req.params;
  try {
    const bookDetails = await Book.findById(book_id).populate({
      path: "review",
      populate: {
        path: "author",
        model: "User",
      },
    });
    res.json(bookDetails);
  } catch (error) {
    console.log(error);
  }
});

//EDIT BOOK
router.put("/edit/:book_id", (req, res) => {
  const { book_id } = req.params;
  const { title, description, price, currency, image } = req.body;

  // Find the book by its ID and update its fields
  Book.findByIdAndUpdate(
    book_id,
    { title, description, price, currency, image },
    { new: true, runValidators: true } // Return the updated book and run schema validation
  )
    .then((book) => {
      // Check if the book is found
      if (!book) {
        return res.status(404).json({
          code: 404,
          message: "Book not found",
        });
      }
      // If the book is found and updated, send the updated book details as the response
      res.json(book);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "Could not edit book", error: err.message })
    );
});

//GET BOOKS NOT CONFIRMED LIST
router.get("/confirm/list", (req, res) => {
  Book.find({ accepted: false })
    .select(" _id title image")
    .then((book) => res.json(book))
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "Book to confirm not found", err })
    );
});

// DELETE BOOK
router.delete("/:book_id", async (req, res) => {
  const { book_id } = req.params;

  try {
    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(book_id);

    if (deletedBook) {
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({
        code: 404,
        message: "Book not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Could not delete book",
      error: error.message,
    });
  }
});

//GOOGLE BOOKS API ROUTE
router.get("/api-books/:bookName", async (req, res) => {
  const { bookName } = req.params;
  /*   const searchQuery = bookName.replace("%20", "+"); */

  const searchResult = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=${process.env.API_KEY}`
  );

  const bookTitles = [];
  const dbBooks = await Book.find();
  dbBooks.map((book) => {
    bookTitles.push(book.title);
  });

  const book = searchResult.data.items[0];

  if (!bookTitles.includes(book.volumeInfo.title)) {
    if (!book.volumeInfo.imageLinks) {
      Book.create({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        description: book.volumeInfo.description,
        /* , owner: id  */
      });
    } else {
      await Book.create({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        image: book.volumeInfo.imageLinks.thumbnail,
        description: book.volumeInfo.description,
        /* , owner: id  */
      });
    }
  }

  res.json(searchResult.data.items);
});

module.exports = router;
