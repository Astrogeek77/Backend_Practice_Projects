const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      required: true,
    },
    pages: Number,
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Book', bookSchema);
