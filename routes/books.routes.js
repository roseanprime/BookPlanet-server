const express = require("express");
const router = express.Router();
const axios = require("axios");
const Book = require("./../models/Book.model");

//CREATE BOOK
router.post("/create", (req, res) => {
  /* const id = req.payload._id */

  const { title, author, publisher, image, description, price, currency } =
    req.body;

  Book.create({
    title,
    author,
    publisher,
    image,
    description,
    price,
    currency /* , owner: id  */,
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

//READ BOOK
router.get("/details/:book_id", (req, res) => {
  const { book_id } = req.params;

  Book.findById(book_id)
    .populate("owner review")
    .then((book) => res.json(book))
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "Book details not found", err })
    );
});

//EDIT BOOK
router.put("/:book_id", (req, res) => {
  const { book_id } = req.params;
  const { title, description, price, currency, image } = req.body;

  Book.findByIdAndUpdate(
    book_id,
    { title, description, price, currency, image },
    { new: true }
  )
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Could not edit book", err })
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

/*CONFIRM BOOK TO SELL*/

router.put("/confirm/:book_id", (req, res) => {
  const { book_id } = req.params;
  const { accepted } = req.body;
  console.log(req.body, " -----req.body");
  Book.findByIdAndUpdate(book_id, { accepted }, { new: true })
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Could not edit book", err })
    );
});

//DELETE BOOK
router.delete("/:book_id", (req, res) => {
  const { book_id } = req.params;

  Book.findByIdAndDelete(book_id)
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Could not delete book", err })
    );
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
      Book.create({
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
