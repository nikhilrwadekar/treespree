// DB Connection & Promise-based Query
const { query } = require("../db/promise-mysql");
const { cp } = require("../db/connection");

// Setup Proxy for Getting API Data in package.json
let queryLimit = 100;
// GET '/api/trees'
exports.getTrees = (req, res) => {
  let getTreeQuery = "";
  // Send all Trees - limited to 10 now
  if (
    req.query.bbtlx &&
    req.query.bbtly &&
    req.query.bbbrx &&
    req.query.bbbry
  ) {
    getTreeQuery = `SELECT trees.tree_id, trees.tree_planted, trees.tree_diameter, trees.tree_latitude, trees.tree_longitude,
  neighbourhoods.neighbourhood_name, genus.genus_name, species.species_name, common_names.common_name_tree,
  (SELECT COUNT(*) FROM trees WHERE trees.common_name_id = common_names.common_name_id) as common_name_tree_count,
  absolute_common_names.absolute_common_name_tree absolute_common_name
FROM trees
INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
INNER JOIN genus ON trees.genus_id = genus.genus_id
INNER JOIN species ON trees.species_id = species.species_id
INNER JOIN common_names ON trees.common_name_id = common_names.common_name_id
INNER JOIN absolute_common_names ON common_names.absolute_common_name_id = absolute_common_names.absolute_common_name_id
WHERE
(trees.tree_latitude > ${req.query.bbbrx} AND trees.tree_latitude < ${req.query.bbtlx} )
AND
(trees.tree_longitude > ${req.query.bbtly} AND  trees.tree_longitude < ${req.query.bbbry});`;
  } else {
    getTreeQuery = `SELECT trees.tree_id, trees.tree_planted, trees.tree_diameter, trees.tree_latitude, trees.tree_longitude,
  neighbourhoods.neighbourhood_name, genus.genus_name, species.species_name, common_names.common_name_tree,
  (SELECT COUNT(*) FROM trees WHERE trees.common_name_id = common_names.common_name_id) as common_name_tree_count,
  absolute_common_names.absolute_common_name_tree absolute_common_name
FROM trees
INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
INNER JOIN genus ON trees.genus_id = genus.genus_id
INNER JOIN species ON trees.species_id = species.species_id
INNER JOIN common_names ON trees.common_name_id = common_names.common_name_id
INNER JOIN absolute_common_names ON common_names.absolute_common_name_id = absolute_common_names.absolute_common_name_id
LIMIT 10;`;
  }

  query(cp, getTreeQuery)
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// GET '/api/trees/id/:tree_id'
exports.getTreeByID = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SELECT trees.tree_id, trees.tree_planted, trees.tree_diameter, trees.tree_latitude, trees.tree_longitude, neighbourhoods.neighbourhood_name, genus.genus_name, species.species_name, common_names.common_name_tree,
    (SELECT COUNT(*) FROM trees WHERE trees.common_name_id = common_names.common_name_id) as common_name_tree_count,
    absolute_common_names.absolute_common_name_tree
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

// GET '/api/trees/id/:tree_name'
exports.getTreeByName = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SELECT
    genus.genus_name,
    species.species_name,
    common_names.common_name_tree,
    (SELECT COUNT(*)
    FROM trees
    INNER JOIN common_names ON common_names.common_name_id = trees.common_name_id
    WHERE common_names.common_name_tree = '${req.params.tree_name}') AS common_name_tree_count,
    absolute_common_names.absolute_common_name_tree
    FROM trees 
    INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
    INNER JOIN genus ON trees.genus_id = genus.genus_id
    INNER JOIN species ON trees.species_id = species.species_id
    INNER JOIN common_names ON trees.common_name_id = common_names.common_name_id
    INNER JOIN absolute_common_names ON absolute_common_names.absolute_common_name_id = common_names.absolute_common_name_id
    WHERE common_names.common_name_tree = '${req.params.tree_name}'
    LIMIT 1`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// GET '/api/trees/types'
exports.getTreeTypes = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SELECT absolute_common_names.*, count(trees.common_name_id) as absolute_common_name_tree_count        
    from absolute_common_names
    inner join common_names
    on (absolute_common_names.absolute_common_name_id = common_names.absolute_common_name_id)
    inner join trees
    on (trees.common_name_id = common_names.common_name_id)
    group by absolute_common_names.absolute_common_name_id
    order by absolute_common_name_tree_count DESC`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// GET '/api/trees/names'
exports.getTreeNames = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SELECT common_names.common_name_id, common_names.common_name_tree common_name, absolute_common_names.absolute_common_name_tree absolute_common_name
  FROM common_names
  INNER JOIN absolute_common_names ON common_names.absolute_common_name_id = absolute_common_names.absolute_common_name_id`
  )
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

// Get /api/trees/species
exports.getTreeSpecies = (req, res) => {
  query(cp, `SELECT * from species`)
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// Get /api/trees/species
exports.getTreeGenus = (req, res) => {
  query(cp, `SELECT * from genus`)
    .then(results => res.send(results))
    .catch(error => res.send(error));
};
