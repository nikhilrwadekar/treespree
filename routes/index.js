// Express and Express Router
const express = require("express");
const router = express.Router();

// Tree Route
const treeRouter = require("./trees.js");

// Use routes in the following format
router.use("/trees", treeRouter);

// Export the Router
module.exports = router;
