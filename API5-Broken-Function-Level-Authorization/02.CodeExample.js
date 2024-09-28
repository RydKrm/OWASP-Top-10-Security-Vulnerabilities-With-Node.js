// From the first code no role or ownership check here
// From the second code allow admin or the user who owns the account to delete the account

const express = require("express");
const app = express();

// Mocked database
const users = [
  { id: "1", name: "John Doe", role: "admin" },
  { id: "2", name: "Jane Doe", role: "customer" },
];

// Middleware: Mock Authentication
app.use((req, res, next) => {
  // Simulate authenticated user as a customer
  req.user = { id: "2", role: "customer" };
  next();
});

// Broken Function Level Authorization Example
app.delete("/deleteUser/:id", (req, res) => {
  const userIdToDelete = req.params.id;
  // No role or ownership check here!

  // Find and remove user
  const userIndex = users.findIndex((u) => u.id === userIdToDelete);
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  res.send("User deleted successfully");
});

// Middleware for Authorization Check
function authorizeAdminOrOwner(req, res, next) {
  const userIdToDelete = req.params.id;

  // Allow admin or the user who owns the account to delete
  if (req.user.role === "admin" || req.user.id === userIdToDelete) {
    return next();
  }

  res.status(403).send("You do not have permission to perform this action");
}

// Secure Route with Authorization Check
app.delete("/deleteUser/:id", authorizeAdminOrOwner, (req, res) => {
  const userIdToDelete = req.params.id;

  // Find and remove user
  const userIndex = users.findIndex((u) => u.id === userIdToDelete);
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  res.send("User deleted successfully");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
