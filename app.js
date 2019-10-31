const express = require('express');
const app = express();
const data = require('./src/data/StreetTrees_ArbutusRidge.json');
const testTree = data.features[0];
const server = app.listen(8080, ()=> {console.log('listening')});

const {con} = require('./src/data/connection');
const promiseQuery = require('./src/data/promise-mysql');

app.get('/', (req,res) => {
    res.send(testTree.properties)
})


app.get('/startBuildingDB', (req,res) => { 
    
    let neigbourhoodQuery = `INSERT INTO neighbourhoods (neighbourhood_name) Select ('${testTree.properties.NEIGHBOURHOOD_NAME}') WHERE(SELECT COUNT(*) FROM neighbourhoods where neighbourhood_name = '${testTree.properties.NEIGHBOURHOOD_NAME}')=0`

    let genusQuery = `INSERT INTO genus (genus_name) Select ('${testTree.properties.GENUS_NAME}') WHERE(SELECT COUNT(*) FROM genus where genus_name = '${testTree.properties.GENUS_NAME}')=0`

    let commonNameQuery = `INSERT INTO common_names (common_name_tree) Select ('${testTree.properties.COMMON_NAME}') WHERE(SELECT COUNT(*) FROM common_names where 	common_name_tree = '${testTree.properties.COMMON_NAME}')=0`

    let speciesQuery = `INSERT INTO species (species_name) Select ('${testTree.properties.SPECIES_NAME}') WHERE(SELECT COUNT(*) FROM species where 	species_name = '${testTree.properties.SPECIES_NAME}')=0`

    let treesQuery = `INSERT INTO trees (tree_id,tree_planted,tree_diameter,tree_latitude, tree_longitude, neighbourhood_id,genus_id, absolute_common_name_id,species_id,common_name_id) Values('${testTree.properties.TREE_ID}',NULL,'${testTree.properties.DIAMETER}','${testTree.properties.LATITUDE}',
    '${testTree.properties.LONGITUDE}', 
    (SELECT (neighbourhood_id) FROM neighbourhoods WHERE neighbourhood_name ='${testTree.properties.NEIGHBOURHOOD_NAME}'),
    (SELECT (genus_id) FROM genus WHERE genus_name ='${testTree.properties.GENUS_NAME}'),NULL, (SELECT (species_id) FROM species WHERE species_name ='${testTree.properties.SPECIES_NAME}'),
    (SELECT (common_name_id) FROM common_names WHERE common_name_tree = '${testTree.properties.COMMON_NAME}')
     ) `

    promiseQuery.query(con, neigbourhoodQuery)
    .then(()=>promiseQuery.query(con, genusQuery))
    .then(()=>promiseQuery.query(con, commonNameQuery))
    .then(()=>promiseQuery.query(con, speciesQuery))
    .then(()=>promiseQuery.query(con, treesQuery))
    .then(results=>{res.send(`Results: ${results}`); })
    .catch(error=>{res.send(`Error: ${error}`); });
    
})