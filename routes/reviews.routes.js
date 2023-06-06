const express = require("express");
const router = express.Router();

const Review = require("./../models/Review.model");
const Book = require("./../models/Book.model");
const Post = require("./../models/Post.model");

const { response } = require("express");

//CREATE REVIEW
router.post("/create-review/:bookId/:userId", async (req, res) => {
  try {
    const { review, rating } = req.body;
    const { userId, bookId } = req.params;

    const newReview = await Review.create({
      content: review,
      rating: rating,
      author: userId,
    });

    const updateBook = await Book.findByIdAndUpdate(bookId, {
      $push: { review: newReview._id },
    });

    res.status(201).json(updateBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to create a review", error });
  }
});

router.delete("/delete-review/:reviewId", async (req, res) => {
  try {
const {reviewId} = req.params

const delbook = await Review.findByIdAndDelete(reviewId)
res.status(201).json(delbook);

  } catch (error) {
    res.status(500).json({ error });
  }
});

//READ REVIEW
router.get("/details/:review_id", (req, res) => {
  const { review_id } = req.params;

  Review.findById(review_id)
    .then((review) => res.json(review))
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "Review details not found", err })
    );
});

//EDIT REVIEW
router.put("/:review_id", (req, res) => {
  const { review_id } = req.params;
  const { title, content, rating } = req.body;

  Review.findByIdAndUpdate(review_id, { title, content, rating }, { new: true })
    .then((review) => res.json(review))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Could not edit review", err })
    );
});

//DELETE REVIEW

router.delete("/:review_id", (req, res) => {
  const { review_id } = req.params;

  Review.findByIdAndDelete(review_id)
    .then((review) => res.json(review))
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "Could not delete review", err })
    );
});

module.exports = router;
