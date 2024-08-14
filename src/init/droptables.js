const connection = require('../config/mysql');

function dropTables() {
  const dropPostsTableQuery = `DROP TABLE IF EXISTS posts;`;
  const dropUsersTableQuery = `DROP TABLE IF EXISTS users;`;

  connection.query(dropPostsTableQuery, (err, results) => {
    if (err) {
      console.error('Error dropping posts table:', err.stack);
    } else {
      console.log('Posts table dropped.');
    }
  });

  connection.query(dropUsersTableQuery, (err, results) => {
    if (err) {
      console.error('Error dropping users table:', err.stack);
    } else {
      console.log('Users table dropped.');
    }
  });

}

// Call the function
dropTables();

// Export the function
module.exports = dropTables;
