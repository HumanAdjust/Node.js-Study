var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    port : '3306',
    database : 'software'
}); // nodejs에서 mysql로 가서 정보를 인증 

conn.connect();

module.exports = conn;