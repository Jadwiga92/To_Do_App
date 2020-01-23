let mysql = require('mysql');

//local mysql db connection
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'to_do'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;