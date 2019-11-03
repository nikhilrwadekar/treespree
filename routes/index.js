// Express and Express Router
const express = require("express");
const router = express.Router();

// Tree Route
const treeRouter = require("./trees.js");

// Neighbourhood Route
const neighbourhoodRouter = require("./neighbourhoods.js");

// Use routes in the following format
router.use("/trees", treeRouter);

router.use("/neighbourhoods", neighbourhoodRouter);

// Export the Router
module.exports = router;
