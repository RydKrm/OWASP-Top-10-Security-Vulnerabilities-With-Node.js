# OWASP Top Ten Security Vulnerabilities

This repository contains examples and explanations related to the OWASP Top Ten security vulnerabilities, providing insights and coding examples for each vulnerability. Navigate through the sections to learn more about each vulnerability and see practical implementations.

## Table of Contents

- [API1: Broken Object Level Authorization](#api1-broken-object-level-authorization)
- [API2: Broken Authentication](#api2-broken-authentication)
- [API3: Broken Object Property Level Authorization](#api3-broken-object-property-level-authorization)
- [API4: Unrestricted Resource Consumption](#api4-unrestricted-resource-consumption)
- [API5: Broken Function Level Authorization](#api5-broken-function-level-authorization)
- [API6: Unrestricted Access to Sensitive Business Flows](#api6-unrestricted-access-to-sensitive-business-flows)
- [API7: Server Side Request Forgery](#api7-server-side-request-forgery)
- [API8: Security Misconfiguration](#api8-security-misconfiguration)
- [API9: Improper Inventory Management](#api9-improper-inventory-management)
- [API10: Unsafe Consumption of APIs](#api10-unsafe-consumption-of-apis)

## API1: Broken Object Level Authorization

This section covers vulnerabilities related to broken object-level authorization, where unauthorized users can access or manipulate objects they should not have access to.

- **admin**
  - `adminRouter.js`: Implementation of admin routes.
- **user**
  - `user_route.js`: Implementation of user routes.
- `auth.js`: Middleware for authentication.
- `BOLA.md`: Detailed explanation of broken object-level authorization.
- `index.js`: Main entry point for the module.

## API2: Broken Authentication

This section focuses on issues related to authentication, including weak passwords, token manipulation, and insufficient session management.

- `00.Broken_Authentication.md`: Overview of broken authentication.
- `01.Week-Password-weak-authentication.js`: Example of weak password authentication.
- `02.Multifactor-Authentication.js`: Example implementation of multifactor authentication.
- `03.Token-base-authentication.js`: Token-based authentication example.
- `04.Insufficient-session-management.js`: Issues with insufficient session management.
- `05.Token_manipulation.js`: Demonstration of token manipulation vulnerabilities.
- `06.Rate-Limiting-And-IP-Blocking.js`: Implementation of rate limiting and IP blocking.

## API3: Broken Object Property Level Authorization

This section explains how improper authorization at the object property level can lead to unauthorized access.

- `01.BOPLA.js`: Example implementation of broken object property level authorization.
- `02.ViewLevelAuthentication.js`: Implementation of view-level authentication.

## API4: Unrestricted Resource Consumption

This section addresses vulnerabilities where resources are consumed excessively due to poor design.

- `00.Explanation.md`: Explanation of unrestricted resource consumption vulnerabilities.
- `02.Coding-Explanation.js`: Code example demonstrating the vulnerability.

## API5: Broken Function Level Authorization

This section focuses on broken function-level authorization, allowing unauthorized access to certain functionalities.

- `01.Explanation.md`: Detailed explanation of broken function-level authorization.
- `02.CodeExample.js`: Code example demonstrating this vulnerability.

## API6: Unrestricted Access to Sensitive Business Flows

This section covers unrestricted access to sensitive business operations.

- `01.Explanation.md`: Explanation of unrestricted access to sensitive business flows.
- `02.CodingExplanation.js`: Code example demonstrating this vulnerability.

## API7: Server Side Request Forgery

This section explains server-side request forgery (SSRF) vulnerabilities, where attackers can manipulate server requests.

- `CodeExplanation.js`: Example code demonstrating SSRF vulnerabilities.
- `Explanation.md`: Detailed explanation of server-side request forgery.

## API8: Security Misconfiguration

This section covers security misconfiguration vulnerabilities and how to prevent them.

- `Example01.js`: Example of security misconfiguration.
- `Example02.js`: Additional example of misconfiguration.
- `Explanation.md`: Detailed explanation of security misconfiguration vulnerabilities.

## API9: Improper Inventory Management

This section discusses vulnerabilities related to improper inventory management in applications.

- `Explanation.md`: Explanation of improper inventory management issues.

## API10: Unsafe Consumption of APIs

This section covers issues related to consuming APIs unsafely.

- `Example01.js`: Example of unsafe API consumption.
- `Example02.js`: Additional example of unsafe consumption.
- `Example03.js`: Another example of unsafe API usage.
- `Explanation.md`: Detailed explanation of unsafe API consumption.

---

## Contribution

Feel free to contribute by adding more examples, explanations, or enhancements to the existing files.

## License

This project is licensed under the MIT License.
