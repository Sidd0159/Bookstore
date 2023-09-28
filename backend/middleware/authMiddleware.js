// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next(); // User is an admin, allow access
    }
    res.status(403).json({ message: 'Access forbidden' }); // User is not authorized
  };
  
  // Middleware to check if the user is a regular user
const isRegularUser = (req, res, next) => {
if (req.isAuthenticated() && req.user.role === 'regular user') {
    return next(); // User is a regular user, allow access
}
res.status(403).json({ message: 'Access forbidden' }); // User is not authorized
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, allow access
  }
  res.status(401).json({ message: 'Authentication required' }); // User is not authenticated
};

module.exports = { isAdmin, isRegularUser, isAuthenticated };
  