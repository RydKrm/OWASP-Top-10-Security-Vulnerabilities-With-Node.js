const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

// Define a rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    const { statusCode, message } = options;
    // Custom handler when the limit is exceeded
    console.log(`IP ${req.ip} blocked after too many attempts`);
    res.status(statusCode).json({ error: message });
  },
});

// Apply the rate limiter only to the login route
app.post("/login", loginLimiter, (req, res) => {
  // Simulate a login process
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    return res.send("Login successful");
  } else {
    return res.status(401).send("Invalid credentials");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
