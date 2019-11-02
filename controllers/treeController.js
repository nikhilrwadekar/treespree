// DB Connection & Promise-based Query
const { query } = require("../db/promise-mysql");
const { cp } = require("../db/connection");

// Setup Proxy for Getting API Data in package.json
let queryLimit = 100;
// GET '/api/trees'
exports.getTrees = (req, res) => {
  // Send all Trees - limited to 10 now
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

// GET '/api/trees/id/:tree_id'
exports.getTreeByID = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SELECT trees.tree_id, trees.tree_planted, trees.tree_diameter, trees.tree_latitude, trees.tree_longitude, neighbourhoods.neighbourhood_name, genus.genus_name, species.species_name, common_names.common_name_tree, absolute_common_names.absolute_common_name_tree
  FROM trees
  INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
  INNER JOIN genus ON trees.genus_id = genus.genus_id
  INNER JOIN species ON trees.species_id = species.species_id
  INNER JOIN common_names ON trees.common_name_id = common_names.common_name_id
  INNER JOIN absolute_common_names ON absolute_common_names.absolute_common_name_id = common_names.absolute_common_name_id
  WHERE trees.tree_id = ${req.params.tree_id}`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// GET '/api/trees/types'
exports.getTreeTypes = (req, res) => {
  // Send all Tree Types
  query(cp, `SELECT * from absolute_common_names`)
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// GET '/api/trees/type/:tree_type'
exports.getTreeType = (req, res) => {
  // Check if count was passed in query, or default to 100
  let queryCount = req.query.count ? req.query.count : queryLimit;

  // If neighbourhood is passed, add it to the query.
  let additionalWhereCondition = req.query.neighbourhood
    ? `AND neighbourhoods.neighbourhood_name = '${req.query.neighbourhood}'`
    : "";

  // Send the requested Tree Type
  query(
    cp,
    `SELECT trees.tree_id, trees.tree_planted, trees.tree_diameter, trees.tree_latitude, trees.tree_longitude, neighbourhoods.neighbourhood_name, genus.genus_name, species.species_name, common_names.common_name_tree common_name, absolute_common_names.absolute_common_name_tree absolute_common_name
  FROM trees
  INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
  INNER JOIN genus ON trees.genus_id = genus.genus_id
  INNER JOIN species ON trees.species_id = species.species_id
  INNER JOIN common_names ON trees.common_name_id = common_names.common_name_id
  INNER JOIN absolute_common_names ON absolute_common_names.absolute_common_name_id = common_names.absolute_common_name_id
  WHERE absolute_common_names.absolute_common_name_tree = '${req.params.tree_type}'
  ${additionalWhereCondition}
  LIMIT ${queryCount}`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};
