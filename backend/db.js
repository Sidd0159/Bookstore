const mongoose = require('mongoose');

// Replace 'your-database-connection-string' with your actual MongoDB connection string
const dbURI = 'mongodb://127.0.0.1:27017/bookstore';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Handle MongoDB connection events
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = mongoose; // Export the Mongoose instance
