const { query } = require("./promise-mysql");
const { cp } = require("./connection");

query(cp, "SELECT * FROM common_names;").then(results => {
  results.forEach(result => {
    // Add the reference to Absolute Common Names for all Common Names
    query(
      cp,
      `UPDATE common_names SET absolute_common_name_id = (SELECT absolute_common_name_id FROM absolute_common_names WHERE '${result.common_name_tree}' LIKE CONCAT('%', absolute_common_name_tree, '%'))
    WHERE common_name_id = ${result.common_name_id};`
    );
  });
});
