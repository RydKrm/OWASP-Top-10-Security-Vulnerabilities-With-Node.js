/**
 *  - Token Theft :- If tokens are stored insecurely, attackers can steal them. For example, if a token is stored in localStorage, it can be accessed by malicious scripts, making it susceptible to XSS attacks.
 *  - Token expiration :- If the token is stored in localStorage, it will expire after a certain period of time, making it vulnerable to session hijacking.
 *  - Don't Reuse Expired Tokens :- If a token does not have a proper expiration time set, attackers can use the token even after it should have been invalidated, leading to unauthorized access.
 *  - Token Forgery :- If weak secret keys are used to sign tokens, attackers can easily forge tokens, gaining unauthorized access.
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const users = []; // Simulating a database

// User registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token with strong secret and expiration
  // If a token does not have a proper expiration time set, attackers can use the token even after it should have been invalidated, leading to unauthorized access
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  // Set token in HTTP-only cookie (better security)
  // Token Theft Prevention: The token is stored in an HTTP-only cookie, which prevents JavaScript from accessing it, thereby reducing the risk of theft through XSS attacks.
  res.cookie("token", token, { httpOnly: true, secure: true });
  res.status(200).json({ message: "Logged in successfully" });
});

// Protected route that requires JWT authentication
app.get("/protected", (req, res) => {
  const token = req.cookies.token; // Access token from cookies

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
