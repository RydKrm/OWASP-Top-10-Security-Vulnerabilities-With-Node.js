//If the token's signature is not verified, the attacker can alter the payload (e.g., user role, permissions) without detection
// If weak signing algorithms (e.g., none algorithm) or poorly managed secret keys are used, attackers can forge tokens.

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// Example of vulnerable middleware that doesn't verify the signature
app.use((req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    // Correct: Verify the token using the secret key
    jwt.verify(token, "secret_key", (err, decoded) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(403).send("Token missing");
  }
});

// A protected route
app.get("/admin", (req, res) => {
  if (req.user && req.user.role === "admin") {
    res.send("Welcome, admin!");
  } else {
    res.status(403).send("Access denied");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
