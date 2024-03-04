const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static('public'));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});