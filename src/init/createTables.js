const { createUsersTable } = require('../models/user');
const { createPostsTable } = require('../models/post');

function createTables() {
  createUsersTable();
  createPostsTable();
}

// Call the function
createTables();

// Export the function
module.exports = createTables;
