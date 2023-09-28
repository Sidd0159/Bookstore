const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Assuming you have a Book model

// Route to get a list of all books (Read operation)
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find(); // Retrieve all books from the database
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a single book by ID (Read operation)
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Retrieve a book by ID
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Additional read-only routes can be added here

module.exports = router;
