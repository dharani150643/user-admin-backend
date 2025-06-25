const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
  user: process.env.DB_USER || 'sql12786610',
  password: process.env.DB_PASS || 'aVddBY8LgV',
  database: process.env.DB_NAME || 'sql12786610'
});

connection.connect(err => {
  if (err) {
    console.error('❌ DB Connection Failed:', err);
    return;
  }
  console.log('✅ MySQL Connected');
});

module.exports = connection;
