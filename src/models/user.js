// src/models/createUsersTable.js

const connection = require('../config/mysql');


// Function to create the users table
function createUsersTable() {
  const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        birthday DATE,
        avatar VARCHAR(255),
        is_admin BOOLEAN DEFAULT false,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

  // Execute the query to create the table
  connection.query(createUsersTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating users table:', err.stack);
      return;
    }
    console.log('Users table created or already exists.');
   
  });
}

// Export the createUsersTable function
module.exports = { createUsersTable };

