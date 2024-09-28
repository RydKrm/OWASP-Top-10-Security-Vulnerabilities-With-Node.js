// In this example, the application exposes sensitive information in the error response from an AP
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Unsafe API Consumption with sensitive error information
app.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get("https://example.com/api/data");
    res.json(response.data);
  } catch (error) {
    // Exposing sensitive information in error response
    res.status(500).json({
      message: "Error retrieving data",
      error: error.response.data, // Exposing sensitive data
    });
  }
});

// Mitigated API Consumption
app.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get("https://example.com/api/data");
    res.json(response.data);
  } catch (error) {
    // Returning a generic error message
    res.status(500).json({
      message: "Error retrieving data. Please try again later.",
    });
    console.error("Error details:", error.response.data); // Log detailed error for internal use
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
