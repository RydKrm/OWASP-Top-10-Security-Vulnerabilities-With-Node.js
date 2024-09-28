/**
 * In an e-commerce platform, a seller can issue refunds for orders. However, due to missing access controls,
 * any seller can refund any order, regardless of whether they processed it or not. This can lead to financial abuse and fraud.
 */
const express = require("express");
const app = express();

// Mocked database of orders
const orders = [
  { id: "order1", sellerId: "seller123", amount: 100 },
  { id: "order2", sellerId: "seller456", amount: 200 },
];

// Middleware to simulate authentication
function authenticate(req, res, next) {
  req.user = { id: "seller123", role: "seller" }; // Simulating a logged-in seller
  next();
}

// Insecure refund route (no authorization check for ownership)
// There’s no check to see if the logged-in seller owns the order.
// Any seller can refund any order, even if it's not theirs.

app.post("/refund/:orderId", authenticate, (req, res) => {
  const orderId = req.params.orderId;
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).send("Order not found");
  }

  // Vulnerable: Any seller can refund any order
  order.refunded = true;
  res.send(`Order ${orderId} refunded successfully`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Secure refund route with authorization check for seller ownership
app.post("/refund/:orderId", authenticate, (req, res) => {
  const orderId = req.params.orderId;
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).send("Order not found");
  }

  // Secure: Check if the seller owns the order
  if (order.sellerId !== req.user.id) {
    return res.status(403).send("You are not authorized to refund this order");
  }

  order.refunded = true;
  res.send(`Order ${orderId} refunded successfully by seller ${req.user.id}`);
});
