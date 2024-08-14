const connection = require('../config/mysql');

// Function to create the posts table
function createPostsTable() {
  return new Promise((resolve, reject) => {
    const createPostsTableQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    connection.query(createPostsTableQuery, (err) => {
      if (err) {
        reject('Error creating post table:', err);
      } else {
          console.log('Posts Table created.');
          resolve();
        }
      });
      });

}

// Export the createPostsTable function
module.exports = { createPostsTable };
