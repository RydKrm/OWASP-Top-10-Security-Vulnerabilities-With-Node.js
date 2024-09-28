/**
 * View-Level Authentication
 * - View-level authentication is a security feature that allows only authorized users to access specific resources.
 * - View-level authentication is typically used to restrict access to sensitive information or perform actions only accessible to authorized users.
 * - For example seller from a e-commerce application can access  user profile name, address, and contact number
 *  - But if the seller can view user password and all the order, then it can create a massive issue of security
 */

const express = require("express");
const app = express();

// Mocked database of users
const users = [
  {
    id: "user123",
    name: "John Doe",
    address: "123 Main St",
    contactNumber: "555-555-5555",
    password: "hashedPassword",
    orders: ["Order1", "Order2"],
    role: "customer",
  },
];

// Middleware for authentication
function authenticate(req, res, next) {
  // In a real-world scenario, we'd verify a JWT or session here
  req.user = { id: "seller567", role: "seller" }; // Example logged-in seller
  next();
}

// Middleware for role-based view-level authentication
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send("Access denied");
    }
    next();
  };
}

// Seller view route: View specific user information
app.get("/users/:id", authenticate, authorize("seller"), (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Only return specific fields that the seller is allowed to see
  const sellerView = {
    name: user.name,
    address: user.address,
    contactNumber: user.contactNumber,
  };

  res.json(sellerView);
});

// Admin view route: View all users
app.get("/users/:id", authenticate, authorize("seller"), (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Only return specific fields that the seller is allowed to see
  const sellerView = {
    name: user.name,
    address: user.address,
    contactNumber: user.contactNumber,
    password: user.password,
    orders: user.orders,
    role: user.role,
  };

  res.json(sellerView);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
