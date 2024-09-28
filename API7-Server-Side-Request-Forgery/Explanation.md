### Server side request forgery

This is a type of security vulnerability that allows an attacker to induce a server to make unintended requests to internal or external resources. This occurs when a server-side application receives a request containing a URL and forwards that request to a different server without properly validating the input.

##### Key Characteristics:

- Internal Network Access: SSRF can exploit the server’s trust in internal networks or services. An attacker may access sensitive internal APIs, databases, or services that are otherwise protected from external access.
- External Resource Access: Attackers can also use SSRF to target external resources, leading to potential data exfiltration or manipulation.
- Poor Input Validation: SSRF vulnerabilities often arise from insufficient input validation, allowing attackers to craft requests that the server processes.

##### Common Attack Scenarios:

- Accessing Internal Services: An attacker could send a request to the server, which then queries an internal service (e.g., a metadata service in cloud environments) that could expose sensitive information.
- Scanning for Vulnerabilities: Attackers can use SSRF to scan for services running on the internal network, revealing potential targets for further exploitation.

#### Example

Imagine a web application that allows users to fetch images from a URL provided by the user. If the application does not validate or restrict the URLs, an attacker might provide a URL to an internal service:

```javascript
// Example of vulnerable code
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
```

In this example, an attacker could supply a URL pointing to an internal service (e.g., http://localhost:8080/admin) and make the server request it, potentially gaining access to sensitive data or administrative functions.

#### Mitigation Strategies:

- Input Validation: Always validate and sanitize user inputs. Implement strict whitelisting of acceptable URLs or domains.
- Network Segmentation: Restrict access from the server to sensitive internal resources to minimize exposure.
- Timeouts and Rate Limiting: Limit the time and frequency of requests made by the server to prevent abuse.
- Use of Proxy: If making external requests, consider using a proxy that restricts the destinations that can be accessed.
