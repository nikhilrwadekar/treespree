// Express and Express Router
const express = require("express");
const router = express.Router();

// Get Handler Functions
const {
  getTrees,
  getTreeTypes,
  getTreeType,
  getTreeByID
} = require("../controllers/treeController");

// GET '/api/albums' sends an array of albums - using albumController;
router.get("/", getTrees);

// GET '/api/trees/types
router.get("/types", getTreeTypes);

// GET '/api/trees/type/:tree_type
router.get("/type/:tree_type", getTreeType);

// GET '/api/trees/tree_id
router.get("/id/:tree_id", getTreeByID);

// Export the Router
module.exports = router;
