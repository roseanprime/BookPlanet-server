const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
