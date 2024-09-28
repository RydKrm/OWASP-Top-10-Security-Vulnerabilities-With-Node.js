/**
 * In this example, we will hardcode the database credentials in the application. This method is not recommended for production environments.
 */

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Hardcoded database configuration
const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASSWORD = "supersecretpassword";
const DB_NAME = "mydatabase";

// Connect to MongoDB
mongoose
  .connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the application!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
