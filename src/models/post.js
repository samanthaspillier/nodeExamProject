const connection = require('../config/mysql');

// Function to create the posts table
function createPostsTable() {
  const createPostsTableQuery = `
     CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      cover VARCHAR(255),
      content TEXT,
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  // Execute the query to create the table
  connection.query(createPostsTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating posts table:', err.stack);
        return;
      }
      console.log('Posts table created or already exists.');
    });

}

// Export the createPostsTable function
module.exports = { createPostsTable };
