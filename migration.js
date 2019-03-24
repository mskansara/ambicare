var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ambicare'
});

migration.init(connection, __dirname + '/migrations');