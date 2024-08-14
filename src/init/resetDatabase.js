const dropTables = require('./droptables');
const createTables = require('./createTables');
const seedDatabase = require('./seed');

function resetDatabase() {
  dropTables();
  setTimeout(() => {
    createTables();
    setTimeout(() => {
      seedDatabase();
    }, 2000); // Adjust timing based on your setup
  }, 2000); // Adjust timing based on your setup
}

resetDatabase();
