/**
 * API2-2023-Broken-Authentication/Week-Password-weak-authentication.js
 * this code will check if the password is strong or not for strong password it required a mix of letters, numbers, and symbols, and a minimum length.
 * this code will also check if the password is strong or not for password is not strong it will send an error message.
 * Check the user password strong or not.
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize dotenv to load environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // Simulating a database

// Rate limiter to prevent brute force attacks
// Set the windowMs to 15 minutes (900000ms)
// Set the max to 5 login attempts per windowMs
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: "Too many login attempts. Please try again later.",
});

/**
 * Strong password policy validation
 *  - At least 8 characters long
 *  - Include upper and lower case letters
 *  - Include a number
 *  - Include a special character
 *  - Use a mix of letters, numbers, and symbols
 *  */

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return passwordRegex.test(password);
}

/**
 * User Registration
 * Path :- POST /register
 * Method :- POST
 * Description :- Register a new user with password validation and bcrypt hashing
 */

// Register route with password validation and bcrypt hashing
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check for a strong password
  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.",
    });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

// Login route with brute force protection and JWT token generation
app.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Compare the password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
  });
});

/**
 * Route that requires JWT authentication
 * Path :- GET /protected
 * Method :- GET
 * Description :- Protected route that requires JWT authentication
 * Access :- Public
 */
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({
      message: "Access granted",
      user: decoded.username,
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
