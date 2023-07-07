const mongoose = require("mongoose");
const User = require("./User");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    likes: {
      type: [],
      required: false,
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
