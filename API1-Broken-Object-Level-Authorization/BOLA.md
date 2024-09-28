### What is Broken Level Authorization?

Broken Level Authorization refers to a situation where a web application fails to properly restrict access based on the user's role or privilege level. This means users can access resources or perform actions outside of their intended permission level (e.g., normal users accessing admin-only features, or one user can access other user personal information).

### Kind of Broken Level Authorization?

1. One role user can access other role user data like regular user can access the admin data.
2. Between the same user role, one user can access other user data. Like `user=123` can access `user=124` data

### Solution for first problem

This problem can be solved by Role Base Authentication (RBA) with token verify(Bearer token verify with JWT).

1. when a user logged in create a JWT bearer token with user role.
2. then in every request from a user, user need to added that JWT token in request header.
3. system will check this info in middleware function.
4. system will decode the JWT token and check if JWT token has the role which is need to access the api path

### Solution for second problem

This problem happen when user have access to manipulate the the request. If user cannot manipulated the request then cannot change the data. If the requested url look like this `/api/user/123` in `GET Request` then user can manipulated it to `/api/user/124`. In `POST Request` user id can be added to request body but this also can be change.
What is the solution? For finding the user `_id` must be needed.
`_id` can be taken from `Header token`. Here is step by step solution

1. When a user request for this own private data, user request with their `JWT Bearer Token` then which insure that user is valid or not.
2. Decode the `JWT Token` check for authentication and get the user `_id` from the token
3. Now find the user private data
