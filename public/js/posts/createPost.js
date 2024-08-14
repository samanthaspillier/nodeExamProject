'use strict';
import { validateName } from '../validation.js'; // Import the validateName function from validation.js

document.addEventListener('DOMContentLoaded', function() {
    const userSelect = document.getElementById('userSelect');

    // Fetch the list of users and populate the dropdown
    fetch('/api/users') // Adjust the API endpoint if necessary
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
});

document.getElementById('postCreateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('createTitle').value;

    // Validate title
    if (!validateName(title)) {
        console.error('Validation failed for title:', title);
        alert('Title cannot contain numbers or special characters.');
        return; // Stop the form submission
    }

    const newPostData = {
        title: title,
        content: document.getElementById('createContent').value,
        user_id: document.getElementById('userSelect').value, // Include user_id
    };

    fetch('/api/posts/post', { // Adjust the API endpoint if necessary
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPostData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating post');
        }
        return response.json();
    })
    .then(() => {
        alert('Post created successfully!');
        window.location.href = '/posts/posts.html'; // Redirect to the posts list
    })
    .catch(error => console.error('Error:', error));
});
