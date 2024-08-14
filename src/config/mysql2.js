const mysql2 = require('mysql2');

const mysql2Connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'exam_nodejs'
});

mysql2Connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database using mysql2.');
});

module.exports = mysql2Connection;
