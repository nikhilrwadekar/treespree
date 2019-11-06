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
        neighbourhoods.neighbourhood_id
    order by neighbourhood_tree_count DESC`
  )
    .then(results => res.send(results))
    .catch(error => res.send(error));
};

// GET '/api/neighbourhoods/neighbourhood-treetype-count'
exports.getCountBreakdown = (req, res) => {
  // Send all Tree Types
  query(
    cp,
    `SET SESSION group_concat_max_len = 2000;
    SELECT neighbourhood_id, neighbourhood_name, group_concat(all_counts separator ',') as counts
    from
    (
    SELECT
      neighbourhoods.*,absolute_common_names.*,CONCAT(absolute_common_names.absolute_common_name_tree, ':',  GROUP_CONCAT(countbreakdown.count SEPARATOR ',')) as all_counts
      FROM countbreakdown
      INNER JOIN neighbourhoods ON neighbourhoods.neighbourhood_id = countbreakdown.neighbourhood_id
       INNER JOIN absolute_common_names ON absolute_common_names.absolute_common_name_id = countbreakdown.absolute_common_name_id
    GROUP BY countbreakdown.neighbourhood_id, countbreakdown.absolute_common_name_id
    ) treecounts
    group by treecounts.neighbourhood_id;`
  )
    .then(results => {
      let fixedResults = [];
      let resultsCopy = results[1];
      resultsCopy.forEach(result => {
        // console.log(result);
        let singleKeyValueAsStringArray = result.counts.split(",");

        let ObjectWithKeyValues = {};
        let currentNeighbourhood = result.neighbourhood_name;
        ObjectWithKeyValues["neighbourhood"] = result.neighbourhood_name;
        for (let i = 0; i < singleKeyValueAsStringArray.length; i++) {
          let singleKeyValueAsStringArraySPLIT = singleKeyValueAsStringArray[
            i
          ].split(":");
          ObjectWithKeyValues[
            singleKeyValueAsStringArraySPLIT[0].trim()
          ] = singleKeyValueAsStringArraySPLIT[1].trim();
        }

        fixedResults.push(ObjectWithKeyValues);
        // console.log(ObjectWithKeyValues);
      });
      // console.log(fixedResults);
      res.json(fixedResults);
    })
    .catch(error => res.send(error));
};
