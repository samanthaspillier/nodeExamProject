const express = require('express');
const path = require('path');
const app = express();

const userRoutes = require('./routes/userRoutes'); // Import the user routes
const postRoutes = require('./routes/postRoutes'); // Import the post routes

const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files
app.use(express.json()); // JSON parsing middleware

// API Routes
app.use('/api/users', userRoutes); // Use the user routes with a prefix
app.use('/api/posts', postRoutes); // Use the post routes with a prefix

// Log all requests
app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next();
});

// Serve the index.html file from the public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
