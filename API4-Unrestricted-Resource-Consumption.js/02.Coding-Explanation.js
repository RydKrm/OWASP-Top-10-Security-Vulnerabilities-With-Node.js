const express = require("express");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

const app = express();

// Middleware: Rate Limiting
/**
 * Use express-rate-limit to limit the number of requests from the same IP address
 * and windowMs (15 minutes)
 * max (100)
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Apply rate limiting to all requests
app.use(limiter);

// Multer configuration: File upload size limit (e.g., max 1MB per file)
// limited the system to give upload files with size less than 1MB
const upload = multer({
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1MB
});

// Route: Handle file uploads with size restriction
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded or file size too large.");
  }
  res.send("File uploaded successfully!");
});

// Example regular route
app.get("/", (req, res) => {
  res.send("Welcome to the rate-limited and secure file upload system!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
