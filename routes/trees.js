// Express and Express Router
const express = require("express");
const router = express.Router();

// Get Handler Functions
const { getTrees, getTreeTypes } = require("../controllers/treeController");

// GET '/api/albums' sends an array of albums - using albumController;
router.get("/", getTrees);

// GET '/api/trees/types
router.get("/types", getTreeTypes);

// Export the Router
module.exports = router;
