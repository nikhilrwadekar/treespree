// Express and Express Router
const express = require("express");
const router = express.Router();

// Get Handler Functions
const {
  getNeighbourhoods,
  getCountBreakdown
} = require("../controllers/neighbourhoodController");

// GET '/api/neighbourhoods' sends an array of albums - using albumController;
router.get("/", getNeighbourhoods);

// GET '/api/neighbourhoods/neighbourhood-treetype-count' sends an array of albums - using albumController;
router.get("/neighbourhood-treetype-count", getCountBreakdown);

// Export the Router
module.exports = router;
