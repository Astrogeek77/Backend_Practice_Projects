const router = require('express').Router();
const booksController = require('../controllers/books');

router
  .route('/books')
  .get(booksController.getBooks) // get all books
  .post(booksController.booksCreate); // create a new book

router
  .route('/books/filter/:filterType') 
  .get(booksController.bookFilterCall); // filter books based on author, publisher, rating...

router
  .route('/books/:title')
  .get(booksController.bookRetriever) // function to retrive a specific book
  .put(booksController.bookUpdater) // function to update a book in DB
  .delete(booksController.bookDeleter); // function to delete a book

module.exports = router;
