const mysql = require('mysql');

const pool = mysql.createPool({
    "user": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DBNAME,
    "host": process.env.DB_HOST,
    "port": 3306
});

exports.pool = pool;