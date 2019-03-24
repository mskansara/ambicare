var db = require('./api/model/db');
var migration = require('mysql-migrations');
migration.init(db.pool, __dirname + '/migrations');