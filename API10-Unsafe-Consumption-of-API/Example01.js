// In this example, a user can submit arbitrary input to an API endpoint without any validation, leading to potential injection attacks.

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Unsafe API Consumption
app.post("/api/submit", async (req, res) => {
  const userInput = req.body.input;

  // Sending unvalidated input to a third-party API
  const response = await axios.post("https://example.com/api/data", {
    data: userInput,
  });

  res.json(response.data);
});

//  To prevent injection attacks, validate and sanitize user input before sending it to the API.
app.post(
  "/api/submit",
  body("input").isString().trim().escape(), // Validate and sanitize input
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userInput = req.body.input;

    // Sending validated input to a third-party API
    const response = await axios.post("https://example.com/api/data", {
      data: userInput,
    });

    res.json(response.data);
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
