const dropTables = require('./droptables');
const createTables = require('./createTables');
const seedDatabase = require('./seed');
const connection = require('../config/mysql');

function resetDatabase() {
  dropTables()
    .then(() => createTables())
    .then(() => seedDatabase())
    .then(() => {
      console.log('Database reset complete.');
    })
    .catch(err => {
      console.error('Error resetting database:', err);
    })
    .finally(() => {
      connection.end(err => {
        if (err) {
          console.error('Error closing the connection:', err);
        } else {
          console.log('Database connection closed.');
        }
      });
    });
}

resetDatabase();
