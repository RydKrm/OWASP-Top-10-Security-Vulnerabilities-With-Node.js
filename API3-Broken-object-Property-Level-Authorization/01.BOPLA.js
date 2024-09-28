// Broken Object Property Level Authorization is a security vulnerability where an application fails to properly enforce access controls on sensitive properties of
// an object.This flaw occurs when an attacker is able to manipulate or access object properties they should not have permission to access, leading to unauthorized
// actions or data exposure

/**
 * According to OWASP (Open Web Application Security Project), this issue arises when the application does not properly check the user’s permissions at the object
 * property level. For example, a user might be authorized to access a specific object, but they shouldn't have permission to modify or view certain properties of
 * that object. If the application does not enforce this restriction, it leads to broken object property level authorization.
 */

/**
 * Example Scenario:
Imagine an application where users can view and edit their profile. Each profile object contains both public and private properties:

Public properties: username, email
Private properties: role, isAdmin
If the application does not properly authorize access to the role or isAdmin properties, a regular user might be able to change their role or escalate their privileges to admin.
 */

app.put("/api/profile/:id", (req, res) => {
  const userId = req.params.id;
  const userUpdates = req.body;

  // Find the user by ID
  User.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status(404).send("User not found");
    }

    // Update user object with the request body properties
    Object.assign(user, userUpdates);

    // Save the user
    user.save((err) => {
      if (err) {
        return res.status(500).send("Error saving user");
      }
      res.send("User updated successfully");
    });
  });
});

/**
 * In this case, the attacker successfully changes their isAdmin property to true, gaining admin privileges.
 * {
    "username": "attacker",
    "isAdmin": true
}
 */

/**
 * To fix this problem
 * To prevent this issue, the application must implement property-level authorization to ensure users can only modify properties they are allowed to access. Sensitive fields like role and isAdmin must be excluded from unauthorized modification
 *  */

app.put("/api/profile/:id", (req, res) => {
  const userId = req.params.id;
  const userUpdates = req.body;

  // Find the user by ID
  User.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status(404).send("User not found");
    }

    // Only allow authorized fields to be updated
    const allowedUpdates = {
      username: userUpdates.username,
      email: userUpdates.email,
    };

    // Prevent unauthorized updates to sensitive fields like role or isAdmin
    Object.assign(user, allowedUpdates);

    // Save the user
    user.save((err) => {
      if (err) {
        return res.status(500).send("Error saving user");
      }
      res.send("User updated successfully");
    });
  });
});
