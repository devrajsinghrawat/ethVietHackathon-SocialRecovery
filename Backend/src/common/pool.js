var mysql = require('mysql2');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  port: '',
  database: 'sr_dao',
});

module.exports = pool;

// var mysql = require('mysql');

// var pool  = mysql.createPool({
//     connectionLimit : 10,
//     host        : "localhost",
//     user        : "root",
//     password    : "",
//     port        : "3306",
//     database    : "infodrive"
//   });

// module.exports = pool;
