const { query } = require("./promise-mysql");
const { cp } = require("./connection");

let neighbourhoods = [],
  absoluteCommonNames = [];

// Get Neighbourhoods
query(cp, "SELECT * FROM neighbourhoods").then(results => {
  neighbourhoods = results;
});

// Get Absolute Common Names
query(cp, "SELECT * FROM absolute_common_names").then(results => {
  absoluteCommonNames = results;
});

// DROP and CREATE countbreakdown table.
query(cp, "DROP TABLE IF EXISTS countbreakdown").then(results =>
  query(
    cp,
    "CREATE TABLE countbreakdown(neighbourhood_id INT NOT NULL, absolute_common_name_id INT NOT NULL, count INT)"
  ).then(results => {
    // Start populating the newly created table.
    neighbourhoods.forEach(neighbourhood => {
      absoluteCommonNames.forEach(absoluteCommonName => {
        query(
          cp,
          `INSERT INTO countbreakdown(neighbourhood_id,absolute_common_name_id, count) (SELECT neighbourhoods.neighbourhood_id,absolute_common_names.absolute_common_name_id AS absolute_common_name,COUNT(*) AS tree_count FROM trees
      INNER JOIN neighbourhoods ON trees.neighbourhood_id = neighbourhoods.neighbourhood_id
      INNER JOIN common_names ON trees.common_name_id = common_names.common_name_id
      INNER JOIN absolute_common_names ON common_names.absolute_common_name_id = absolute_common_names.absolute_common_name_id
      WHERE neighbourhoods.neighbourhood_name = '${neighbourhood.neighbourhood_name}' AND absolute_common_names.absolute_common_name_tree = '${absoluteCommonName.absolute_common_name_tree}')`
        );
      });
    });
  })
);
