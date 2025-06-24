const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'sql12.freesqldatabase.com/',
  user: 'sql12786610',
  password: 'aVddBY8LgV',
  database: 'sql12786610'
});
connection.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});
module.exports = connection;
