const express = require('express');
const path = require('path'); // Import the path module for working with file and directory paths
const app = express();
const connection = require('./config/mysql'); // Import the connection to close it later

const userRoutes = require('./routes/userRoutes'); // Import the user routes
const postRoutes = require('./routes/postRoutes'); // Import the post routes
const { createPostsTable } = require('./models/post'); // Import the createPostsTable function
const { createUsersTable } = require('./models/user'); // Import the createUsersTable function


const PORT = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files
app.use(express.json()); // json parsing middleware
app.use(userRoutes); // Use the user routes
app.use(postRoutes); // Use the post routes


// Serve static files from the "public" directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public'));
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
