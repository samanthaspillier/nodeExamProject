const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/user', (req, res) => {
    userController.createUser(req.body, (err, userId) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).send({ id: userId, ...req.body });
    });
});

// Get all users
router.get('/', (req, res) => {  // Changed from '/users' to '/'
    userController.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(users);
    });
});

// Get a user by ID
router.get('/user/:id', (req, res) => {
    userController.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        const user = users.find(user => user.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    });
});

// Update a user by ID
router.put('/user/:id', (req, res) => {
    userController.updateUser(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User updated successfully');
    });
});

// Delete a user by ID
router.delete('/user/:id', (req, res) => {
    userController.deleteUser(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    });
});

module.exports = router;
