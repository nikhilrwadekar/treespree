// Express and Express Router
const express = require("express");
const router = express.Router();

// Get Handler Functions
const { getTrees } = require("../controllers/treeController");

// GET '/api/albums' sends an array of albums - using albumController;
router.get("/", getTrees);

// Export the Router
module.exports = router;
