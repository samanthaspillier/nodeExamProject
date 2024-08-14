const connection = require('../config/mysql');

function dropTables() {
  return new Promise((resolve, reject) => {
    const query = 'DROP TABLE IF EXISTS posts, users;';
    connection.query(query, (err) => {
      if (err) {
        console.error('Error dropping tables:', err); // Log the error
        reject(err); // Reject with the error
      } else {
        console.log('Tables dropped.');
        resolve(); // Resolve the promise on success
      }
    });
  });
}

module.exports = dropTables;
