const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: [String],
    publisher: {
      type: String,
    },
    image: {
      type: String,
    },
    description: String,
    price: {
      type: Number,
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
