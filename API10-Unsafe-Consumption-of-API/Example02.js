// In this example, the application uses a hardcoded API key for authentication, exposing it to potential attackers.
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Unsafe API Consumption with hardcoded API key
app.get("/api/data", async (req, res) => {
  const response = await axios.get("https://example.com/api/data", {
    headers: {
      Authorization: "Bearer hardcoded_api_key", // Hardcoded API key
    },
  });

  res.json(response.data);
});

// Use environment variables to store sensitive credentials and implement proper authentication methods.
// Using environment variables for the API key
app.get("/api/data", async (req, res) => {
  const apiKey = process.env.API_KEY; // Load from environment variable

  const response = await axios.get("https://example.com/api/data", {
    headers: {
      Authorization: `Bearer ${apiKey}`, // Securely using the API key
    },
  });

  res.json(response.data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
