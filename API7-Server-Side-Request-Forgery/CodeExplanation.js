const express = require("express");
const request = require("request");
const app = express();

// Vulnerable endpoint to fetch an image
app.get("/fetch-image", (req, res) => {
  const imageUrl = req.query.url; // URL provided by the user

  // No validation of the URL
  request(imageUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body); // Send the image back to the user
    } else {
      res.status(400).send("Error fetching image");
    }
  });
});

// Allowed domains for image fetching
const allowedDomains = ["example.com", "images.example.com"];

// Function to validate URL
function isValidUrl(url) {
  const parsedUrl = new URL(url);
  return allowedDomains.includes(parsedUrl.hostname);
}
// Secure endpoint to fetch an image
app.get("/fetch-image", (req, res) => {
  const imageUrl = req.query.url;

  // Validate the URL
  if (!isValidUrl(imageUrl)) {
    return res.status(400).send("Invalid URL");
  }

  request(imageUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body); // Send the image back to the user
    } else {
      res.status(400).send("Error fetching image");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
