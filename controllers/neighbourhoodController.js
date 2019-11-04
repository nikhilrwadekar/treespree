// DB Connection & Promise-based Query
const { query } = require("../db/promise-mysql");
const { cp } = require("../db/connection");

// GET '/api/neighbourhoods'
exports.getNeighbourhoods = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SELECT neighbourhoods.*, count(trees.neighbourhood_id) as neighbourhood_tree_count        
    from neighbourhoods
    left join trees
    on (neighbourhoods.neighbourhood_id = trees.neighbourhood_id)
    group by
        neighbourhoods.neighbourhood_id`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};
