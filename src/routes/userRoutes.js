const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Create a new user
router.post('/user', (req, res) => {
    const { firstName, lastName, email } = req.body;
    const query = 'INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)';
    connection.query(query, [firstName, lastName, email], (error, results) => {
        if (error) {
            return res.status(400).send(error);
        }
        res.status(201).send({ id: results.insertId, firstName, lastName, email });
    });
});

// Get all users
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

// Get a user by ID
router.get('/user/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(results[0]);
    });
});

// Update a user by ID
router.put('/user/:id', (req, res) => {
    const { firstName, lastName, email } = req.body;
    const query = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
    connection.query(query, [firstName, lastName, email, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).send(error);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User updated successfully');
    });
});

// Delete a user by ID
router.delete('/user/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    });
});

module.exports = router;
