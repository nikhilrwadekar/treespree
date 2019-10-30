// DB Connection & Promise-based Query
const { query } = require("../db/promise-mysql");
const { cp } = require("../db/connection");
const mysql = require("mysql");

// Setup Proxy for Getting API Data in package.json

// GET '/api/trees'
exports.getTrees = (req, res) => {
  // Send all Albums
  query(
    cp,
    `SELECT trees.tree_id, trees.tree_planted, trees.tree_diameter, trees.tree_latitude, trees.tree_longitude, neighbourhoods.neighbourhood_name, genus.genus_name, species.species_name, common_names.common_name_tree  
  FROM trees
  INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
  INNER JOIN genus ON trees.genus_id = genus.genus_id
  INNER JOIN species ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
  INNER JOIN common_names ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
  LIMIT 10;`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};
