const express = require('express');
const app = express();
const port = 5000;
require('./db'); // Import the database configuration
const passport = require('passport')
const session = require('express-session');
const { isAdmin, isRegularUser, isAuthenticated } = require('./middleware/authMiddleware');
const {initializePassport} = require('./passportConfig')
const ejs = require("ejs")
const cors = require('cors')

initializePassport(passport)
// Middleware for session and passport
app.use(
    session({
      secret: 'your-secret-key',
      resave: true,
      saveUninitialized: true,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

// Import the route files for regular users and admins
const regularUserRoutes = require('./routes/regular');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("view engine", ejs)

// Use auth routes
app.use('/api/auth', authRoutes);

// Define base URLs for regular users and admins
app.use('/api/regular-users',isRegularUser, regularUserRoutes);
app.use('/api/admins',isAdmin, adminRoutes);

// Route to check authentication status
app.get('/check-auth', isAuthenticated, (req, res) => {
  // If user is authenticated, send user details
  res.json({
    isAuthenticated: true,
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role, // Assuming your User model has a 'role' field
    },
  });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})