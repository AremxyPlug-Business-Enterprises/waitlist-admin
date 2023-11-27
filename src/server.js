const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware to protect the /dashboard route
  server.use("/Dashboard", (req, res, next) => {
    // Implement your authentication and authorization logic here
    // For example, check if the user is authenticated
    // If not, redirect to the login page
    // You can also check for specific roles/permissions

    // Example: If not authenticated, redirect to the login page
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    // If authenticated, continue to the /dashboard route
    return next();
  });

  // Default route handling
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
