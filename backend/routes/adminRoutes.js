const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import the Book model
const User = require('../models/User'); // Import the User model

// Create a new book (Create operation)
router.post('/create-book', async (req, res) => {
  try {
    const { title, author, description, publicationYear, isbn } = req.body;

    // Create a new book document
    const newBook = new Book({
      title,
      author,
      description,
      publicationYear,
      isbn,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an existing book by ID (Update operation)
router.put('/update-book/:id', async (req, res) => {
  try {
    const { title, author, description, publicationYear, isbn } = req.body;
    const bookId = req.params.id;

    // Find the book by ID and update its fields
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        author,
        description,
        publicationYear,
        isbn,
      },
      { new: true } // Return the updated book
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a book by ID (Delete operation)
router.delete('/delete-book/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find the book by ID and remove it
    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign admin role to a specific user
router.put('/assign-admin/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assign the "admin" role
    user.role = 'admin';
    await user.save();

    res.json({ message: 'Admin role assigned successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
