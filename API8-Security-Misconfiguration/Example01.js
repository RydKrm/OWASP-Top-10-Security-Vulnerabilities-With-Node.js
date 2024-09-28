const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the application!");
});

// this url can be accessed without any authentication and database can be access by public users
app.get("/config", (req, res) => {
  // Exposing sensitive information
  res.json({
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD, // This should NOT be exposed
    secretApiKey: process.env.SECRET_API_KEY, // This should NOT be exposed
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
