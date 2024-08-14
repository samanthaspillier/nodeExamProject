const connection = require('../config/mysql');

// Create a new user
function createUser(userData, callback) {
  const { name, email, birthday, avatar, is_admin, password } = userData;
  
  const query = `
    INSERT INTO users (name, email, birthday, avatar, is_admin, password)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  
  const values = [name, email, birthday, avatar, is_admin, password];
  
  connection.query(query, values, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.insertId); // Returns the ID of the newly created user
  });
}

// Fetch all users
function getAllUsers(callback) {
    const query = 'SELECT * FROM users;';
    
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
}

// Update a user's information
function updateUser(userId, updatedData, callback) {
    const { name, email, birthday, avatar, is_admin, password } = updatedData;

    const query = `
        UPDATE users
        SET name = ?, email = ?, birthday = ?, avatar = ?, is_admin = ?, password = ?
        WHERE id = ?;
    `;

    const values = [name, email, birthday, avatar, is_admin, password, userId];

    connection.query(query, values, (err, results) => {
        if (err) {
        return callback(err);
        }
        callback(null, results);
    });
}

// Delete a user
function deleteUser(userId, callback) {
    const query = 'DELETE FROM users WHERE id = ?;';
    
    connection.query(query, [userId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
}

// Export all functions
module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};
