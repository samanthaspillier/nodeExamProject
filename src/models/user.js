// src/models/createUsersTable.js

const connection = require('../config/mysql');


// Function to create the users table
function createUsersTable() {
  return new Promise((resolve, reject) => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          birthday DATE,
          is_admin BOOLEAN DEFAULT false,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;

      connection.query(createUsersTableQuery, (err) => {
        if (err) {
          reject('Error creating users table:', err);
        } else {
            console.log('Users Table created.');
            resolve();
          }
        });
        });
  }

// Export the createUsersTable function
module.exports = { createUsersTable };

