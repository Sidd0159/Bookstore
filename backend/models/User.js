const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'regular user'], // Define available roles
    default: 'regular user', // Set the default role during registration
  },
  // Add more fields as needed for your application
});

// Hash the user's password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to validate password
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create a User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
