const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "dbwinehouse",
  password: "tomassale2003",
  database: "winehouse",
});

module.exports = connection;
