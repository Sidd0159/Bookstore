const express = require('express');
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email already taken' });
    }

    // Create a new user with the "regular user" role by default
    const newUser = new User({ username, email, password, role: 'regular user' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If authentication is successful, this function will be called
  res.json({ message: 'Login successful', user: req.user });
});

// User logout
router.get('/logout', isAuthenticated, (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during logout' });
      }
      res.json({ message: 'Logout successful' });
    });
  });

module.exports = router;
