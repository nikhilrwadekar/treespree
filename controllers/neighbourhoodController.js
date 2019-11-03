// DB Connection & Promise-based Query
const { query } = require("../db/promise-mysql");
const { cp } = require("../db/connection");

// GET '/api/neighbourhoods'
exports.getNeighbourhoods = (req, res) => {
  // Send all Tree Types
  query(cp, `SELECT * from neighbourhoods`)
    .then(results => res.send(results))
    .catch(error => res.send(error));
};
