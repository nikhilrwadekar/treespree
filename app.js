const express = require("express");

// CORS for local development and remote API requests
var cors = require("cors");

const app = express();

// Use CORS
app.use(cors());

app.listen(8080, () => {
  console.log("Listening on port 8080!");
});

// Static Middleware to serve the public folder as is
app.use(express.static("build"));

// Use JSON - This will allow you to work with req.body
app.use(express.json());

// Use Router
const router = require("./routes/index.js");
app.use("/api", router);
