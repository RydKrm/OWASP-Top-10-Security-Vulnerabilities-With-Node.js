/**
 * Insufficient session management is a critical security concern in API development. It occurs when the mechanisms for managing user sessions are not adequately implemented, leading to vulnerabilities that attackers can exploit.
 * - Session Fixation: An attacker tricks a user into using a known session ID, allowing the attacker to hijack the user's session.
 * - Missing Logout: If a user cannot properly log out, the session may remain active, allowing unauthorized access if someone else uses the same device.
 * - Improper Session Timeouts: If sessions do not expire after a reasonable period of inactivity, attackers can take advantage of long-lived sessions to impersonate users.
 */
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "your-secret", // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

const users = []; // Simulating a database

// User registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
});

// User login (vulnerable to session fixation)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Attacker could set their own session ID here
  req.session.user = user.username; // No new session ID generated
  res.status(200).json({ message: "Logged in successfully" });
});

// Protected route
app.get("/protected", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  res.status(200).json({ message: "Access granted", user: req.session.user });
});

// User logout (missing proper logout handling)
app.post("/logout", (req, res) => {
  // Ideally should destroy the session here
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
