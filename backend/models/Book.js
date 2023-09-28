const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true, // Ensure that ISBNs are unique
  },
  // Add more fields as needed for your application
});

// Create a Book model using the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
