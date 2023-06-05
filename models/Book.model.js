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
      default: "https://wallpaper.dog/large/817497.jpg",
    },
    description: String,
    price: {
      type: Number,
    },
    currency: {
      type: String,
      default: "€",
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
