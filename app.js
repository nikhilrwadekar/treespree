const express = require("express");
const app = express();

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
