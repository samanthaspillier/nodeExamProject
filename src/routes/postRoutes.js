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
router.get('/posts', (req, res) => {
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
    postController.getAllPosts((err, posts) => {
        if (err) {
            return res.status(500).send(err);
        }
        const post = posts.posts.find(post => post.id === parseInt(req.params.id));
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
            return res.status(400).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found');
        }
        res.send('Post updated successfully');
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
        res.send('Post deleted successfully');
    });
});

module.exports = router;
