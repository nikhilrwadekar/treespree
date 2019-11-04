// Express and Express Router
const express = require("express");
const router = express.Router();

// Get Handler Functions
const { getNeighbourhoods } = require("../controllers/neighbourhoodController");

// GET '/api/albums' sends an array of albums - using albumController;
router.get("/", getNeighbourhoods);

// Export the Router
module.exports = router;
