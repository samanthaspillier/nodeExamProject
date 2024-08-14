const connection = require('../config/mysql');

// Create a new post
function createPost(postData, callback) {
    const { title, content, cover, user_id } = postData;
    
    const query = `
        INSERT INTO posts (title, content, cover, user_id)
        VALUES (?, ?, ?, ?);
    `;
    
    const values = [title, content, cover, user_id];
    
    connection.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId); // Returns the ID of the newly created post
    });
}

// Fetch all posts with optional search by title
function getAllPosts(callback, limit = 5, offset = 0, search = '') {
    let query = 'SELECT SQL_CALC_FOUND_ROWS * FROM posts';
    const queryParams = [];

    if (search) {
        query += ' WHERE title LIKE ?';
        const searchPattern = `%${search}%`;
        queryParams.push(searchPattern);
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            return callback(err);
        }

        connection.query('SELECT FOUND_ROWS() AS total', (err, totalResults) => {
            if (err) {
                return callback(err);
            }

            const total = totalResults[0].total;
            callback(null, { posts: results, total });
        });
    });
}

// Update a post's information
function updatePost(postId, updatedData, callback) {
    const { title, content, cover, user_id } = updatedData;

    const query = `
        UPDATE posts
        SET title = ?, content = ?, cover = ?, user_id = ?
        WHERE id = ?;
    `;

    const values = [title, content, cover, user_id, postId];

    connection.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Delete a post
function deletePost(postId, callback) {
    const query = 'DELETE FROM posts WHERE id = ?;';
    
    connection.query(query, [postId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Export all functions
module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
};
