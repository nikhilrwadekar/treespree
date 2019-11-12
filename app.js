const express = require("express");
const path = require("path");

// CORS for local development and remote API requests
var cors = require("cors");

const app = express();

// Use CORS
app.use(cors());

app.listen(8080, () => {
  console.log("Listening on port 8080!");
});

// Use Router
const router = require("./routes/index.js");
app.use("/api", router);

// Static Middleware to serve the public folder as is
app.use(express.static(path.join(__dirname, "build")));

// Route handler for anything other than the API (Resolves to React router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Use JSON - This will allow you to work with req.body
app.use(express.json());
