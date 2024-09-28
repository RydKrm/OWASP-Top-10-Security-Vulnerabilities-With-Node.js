const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const users = []; // Simulating a database

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a random verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate and send the verification code
  const verificationCode = generateVerificationCode();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to user's email
    subject: "Your Verification Code",
    text: `Your verification code is ${verificationCode}`,
  });

  // Store the verification code in the user object (in a real app, use a better method)
  user.verificationCode = verificationCode;

  res.status(200).json({ message: "Verification code sent to your email" });
});

// Verify code route
app.post("/verify", (req, res) => {
  const { username, code } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || user.verificationCode !== code) {
    return res.status(401).json({ message: "Invalid verification code" });
  }

  // Generate JWT token upon successful verification
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Clear the verification code after use
  delete user.verificationCode;

  res.status(200).json({ message: "Logged in successfully", token });
});

// Protected route that requires JWT authentication
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Access granted", user: decoded.username });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
