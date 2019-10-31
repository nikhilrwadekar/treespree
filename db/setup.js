const { query } = require("./promise-mysql");
const { cp } = require("./connection");

// Get JSON files for Trees
const files = [
  require("../data/StreetTrees_ArbutusRidge.json"),
  require("../data/StreetTrees_CityWide.json"),
  require("../data/StreetTrees_Downtown.json"),
  require("../data/StreetTrees_DunbarSouthlands.json"),
  require("../data/StreetTrees_Fairview.json"),
  require("../data/StreetTrees_GrandviewWoodland.json"),
  require("../data/StreetTrees_HastingsSunrise.json"),
  require("../data/StreetTrees_KensingtonCedarCottage.json"),
  require("../data/StreetTrees_Kerrisdale.json"),
  require("../data/StreetTrees_Killarney.json"),
  require("../data/StreetTrees_Kitsilano.json"),
  require("../data/StreetTrees_Marpole.json"),
  require("../data/StreetTrees_MountPleasant.json"),
  require("../data/StreetTrees_Oakridge.json"),
  require("../data/StreetTrees_RenfrewCollingwood.json"),
  require("../data/StreetTrees_RileyPark.json"),
  require("../data/StreetTrees_Shaughnessy.json"),
  require("../data/StreetTrees_SouthCambie.json"),
  require("../data/StreetTrees_Strathcona.json"),
  require("../data/StreetTrees_Sunset.json"),
  require("../data/StreetTrees_VictoriaFraserview.json"),
  require("../data/StreetTrees_WestEnd.json"),
  require("../data/StreetTrees_WestPointGrey.json")
];

// Setup Tree DB!

// Add all Absolutely Common Names FIRST
const absolutelyCommonNames = [
  "PEACH",
  "LABURNUM",
  "PLANE",
  "DOVE",
  "SPINDLE",
  "GOLDENRAIN",
  "MONKEY PUZZLE",
  "PAGODA",
  "STRAWBERRY",
  "RUBBER",
  "ANGELICA",
  "EMPRESS",
  "EPAULETTE",
  "SILK",
  "CHESTNUT",
  "MAPLE",
  "ASH",
  "CHERRY",
  "HORNBEAM",
  "LILAC",
  "FIR",
  "DOGWOOD",
  "PLUM",
  "CEDAR",
  "LINDEN",
  "APPLE",
  "OAK",
  "HAWTHORN",
  "BIRCH",
  "PEAR",
  "HEMLOCK",
  "LOCUST",
  "TUPELO",
  "REDWOOD",
  "SWEETGUM",
  "ELM",
  "FILBERT",
  "WALNUT",
  "APPLE",
  "HOLLY",
  "SNOWBELL",
  "HONEYLOCUST",
  "BOXELDER",
  "SERVICEBERRY",
  "WILLOW",
  "BEECH",
  "CYPRESS",
  "TULIP",
  "IRONWOOD",
  "PINE",
  "ARBORVITAE",
  "BUTTERNUT",
  "SEQUOIA",
  "WHITEBEAM",
  "CATALPA",
  "ACACIA",
  "ZELKOVA",
  "MAGNOLIA",
  "FALSE CYPRESS",
  "SPRUCE",
  "COTTONWOOD",
  "HACKBERRY",
  "CHOKECHERRY",
  "GUM",
  "WINGNUT",
  "ALDER",
  "MANGLETIA",
  "REDBUD",
  "SUMAC",
  "BASSWOOD",
  "JUNIPER",
  "CRYPTOMERIA",
  "HEAVEN",
  "CHITALPA",
  "SHARON",
  "BUCKEYE",
  "STEWARTIA",
  "AVONDALE",
  "LAUREL",
  "YELLOWWOOD",
  "POPLAR",
  "MADRONE",
  "ARBUTUS",
  "LARCH",
  "PALM",
  "MULBERRY",
  "HAZELNUT",
  "NANNYBERRY",
  "SOURWOOD",
  "YEW",
  "FIG",
  "CORKTREE",
  "NUT",
  "COFFEETREE",
  "GINKGO",
  "GOLDENCHAIN",
  "BUCKTHORN",
  "ELDER",
  "CASCARA",
  "APRICOT",
  "ASPEN",
  "GLORYBOWER",
  "BERRY",
  "ARALIA",
  "KATSURA"
];

/* 
Code for adding all absolutely common names goes here
*/
absolutelyCommonNames.forEach(absolutelyCommonName => {
  query(
    cp,
    `INSERT INTO absolute_common_names (absolute_common_name_tree) VALUES ('${absolutelyCommonName}');`
  ).catch(error => console.log(error));
});

// THEN add everything else in Order -- Change this to treeData.features later

files.forEach(treeData => {
  treeData.features.forEach(tree => {
    // Add Neighbourhood
    let neigbourhoodQuery = `INSERT INTO neighbourhoods (neighbourhood_name) Select ('${tree.properties.NEIGHBOURHOOD_NAME}') WHERE(SELECT COUNT(*) FROM neighbourhoods where neighbourhood_name = '${tree.properties.NEIGHBOURHOOD_NAME}')=0`;

    // Add Genus
    let genusQuery = `INSERT INTO genus (genus_name) Select ('${tree.properties.GENUS_NAME}') WHERE(SELECT COUNT(*) FROM genus where genus_name = '${tree.properties.GENUS_NAME}')=0`;

    // Add Absolute Common Name Later
    let commonNameQuery = `INSERT INTO common_names (common_name_tree)
    SELECT ('${tree.properties.COMMON_NAME}') WHERE(SELECT COUNT(*) FROM common_names where common_name_tree = '${tree.properties.COMMON_NAME}')=0;`;

    // Add Species
    let speciesQuery = `INSERT INTO species (species_name) Select ('${tree.properties.SPECIES_NAME}') WHERE(SELECT COUNT(*) FROM species where 	species_name = '${tree.properties.SPECIES_NAME}')=0`;

    // Add Trees, Finally
    let treesQuery = `INSERT INTO trees (tree_id,tree_planted,tree_diameter,tree_latitude, tree_longitude, neighbourhood_id,genus_id,species_id,common_name_id) Values('${
      tree.properties.TREE_ID
    }',${tree.properties.DATE_PLANTED},'${tree.properties.DIAMETER}','${
      tree.geometry.coordinates[1]
    }',
    '${tree.geometry.coordinates[0]}',
    (SELECT (neighbourhood_id) FROM neighbourhoods WHERE neighbourhood_name ='${
      tree.properties.NEIGHBOURHOOD_NAME
    }'),
    (SELECT (genus_id) FROM genus WHERE genus_name ='${
      tree.properties.GENUS_NAME
    }'), (SELECT (species_id) FROM species WHERE species_name ='${
      tree.properties.SPECIES_NAME
    }'),
    (SELECT (common_name_id) FROM common_names WHERE common_name_tree = '${
      tree.properties.COMMON_NAME
    }')
     ) `;

    // Run the Query - Promise based - ensuring the necessary tables are populated first.
    query(cp, neigbourhoodQuery)
      .then(() => query(cp, genusQuery))
      .then(() => query(cp, commonNameQuery))
      .then(() => query(cp, speciesQuery))
      .then(() => query(cp, treesQuery))
      .then(results => {
        console.log(`Results: ${results}`);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  });
});
