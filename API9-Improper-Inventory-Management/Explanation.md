### Improper Inventory Management

It is a significant vulnerability often seen in applications, especially e-commerce platforms. This vulnerability arises when an application fails to manage its
inventory properly, leading to security issues such as unauthorized access to inventory data, incorrect inventory status, and exploitation by malicious users.

##### Example Scenario: E-Commerce API Vulnerability

###### Context

An e-commerce platform allows vendors to update their product inventory through a RESTful API. However, the API does not properly validate the user's permissions to make these changes.

###### Vulnerability

The API endpoint for updating the inventory is exposed without adequate authentication and authorization checks.

```javascript
// POST /api/inventory/update
{
  "productId": "abc123",
  "newQuantity": 50
}
```

#### Attack Scenario

- Accessing the Endpoint:
  A malicious user discovers the `/api/inventory/update` endpoint through documentation or network sniffing.
  This endpoint is intended only for authenticated vendor accounts.
- Bypassing Authentication:
  The attacker creates a script to send requests directly to the API, bypassing any front-end authentication mechanisms.
  They send a request with a valid productId and a manipulated newQuantity

```javascript
const axios = require("axios");

const updateInventory = async () => {
  try {
    const response = await axios.post(
      "http://example.com/api/inventory/update",
      {
        productId: "abc123", // Product they don't own
        newQuantity: 5000, // Unreasonably high stock quantity
      }
    );
    console.log("Inventory updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating inventory:", error.response.data);
  }
};

updateInventory();
```

#### Consequences

- The attacker updates the stock level of a product they do not own, falsely increasing the availability of items that should be out of stock.
- This could lead to overselling, where multiple customers order the same item, causing fulfillment issues and customer dissatisfaction.
- Additionally, the attacker might exploit this to manipulate sales data or profit from the system in unauthorized ways.
