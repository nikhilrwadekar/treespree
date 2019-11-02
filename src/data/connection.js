const mysql = require('mysql');
const connectionPool = mysql.createConnection({
    host : 'localhost',
    port: '8889',
    user : 'root',
    password : 'root',
    database : 'treespree', // this has to be the name of the database you just created. multipleStatements: true
    });

    connectionPool.connect(function(err) {
  if (err) throw err;
  console.log("Treespree DB Connected!"); 
});

exports.con = connectionPool;