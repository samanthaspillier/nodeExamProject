const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Ensure correct import

// Create a new post
router.post('/post', (req, res) => {
    postController.createPost(req.body, (err, postId) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).send({ id: postId, ...req.body });
    });
});

// Get all posts with pagination and optional search by title
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || '';

    postController.getAllPosts((err, result) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    }, limit, offset, search);
});

// Get a post by ID
router.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    console.log('Fetching post with ID:', postId);

    postController.getPostById(postId, (err, post) => {
        if (err) {
            console.error('Error fetching post:', err);
            return res.status(500).send(err);
        }
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.json(post);
    });
});



// Update a post by ID
router.put('/post/:id', (req, res) => {
    postController.updatePost(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message }); // Send JSON error response
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' }); // Send JSON error response
        }
        res.json({ message: 'Post updated successfully' }); // Send JSON response
    });
});


// Delete a post by ID
router.delete('/post/:id', (req, res) => {
    postController.deletePost(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found');
        }
        res.json({ message: 'Post deleted successfully' }); // Send JSON response
    });
});

module.exports = router;
