'use strict';

import { validateName } from './validation.js'; // Import the validateName function from validation.js

// Function to fetch and display all users in the dropdown and the list
function fetchUsers() {
    fetch('/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const usersList = document.getElementById('usersList');
            const userDropdown = document.getElementById('userDropdown');

            usersList.innerHTML = '';
            userDropdown.innerHTML = '<option value="">--Select a User--</option>'; // Reset dropdown

            data.forEach(user => {
                // Add user to the list
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Birthday: ${user.birthday}, Admin: ${user.is_admin}`;
                usersList.appendChild(listItem);

                // Add user to the dropdown
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userDropdown.appendChild(option);
            });

            document.getElementById('updateUserForm').style.display = 'block'; // Show update form
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Handle the form submission to create a new user
document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;

    // Validate name
    if (!validateName(name)) {
        console.error('Validation failed for name:', name);
        alert('Name cannot contain numbers or special characters.');
        return; // Stop the form submission
    }

    const formData = {
        name: name,
        email: document.getElementById('email').value,
        birthday: document.getElementById('birthday').value,
        is_admin: document.getElementById('is_admin').checked,
        password: document.getElementById('password').value,
    };

    fetch('/api/users/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('User created successfully!');
        console.log(data);
        fetchUsers(); // Refresh the user dropdown and list
    })
    .catch(error => console.error('Error:', error));
});

// Show the update fields when a user is selected
document.getElementById('userDropdown').addEventListener('change', function() {
    const userId = this.value;

    if (userId) {
        fetch(`/api/users/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(user => {
                // Populate the update form fields with the selected user's data
                document.getElementById('updateName').value = user.name;
                document.getElementById('updateEmail').value = user.email;
                document.getElementById('updateBirthday').value = user.birthday;
                document.getElementById('updateIsAdmin').checked = user.is_admin;
                document.getElementById('updatePassword').value = ''; // You may choose not to auto-fill password

                document.getElementById('updateFields').style.display = 'block'; // Show the fields
            })
            .catch(error => console.error('Error fetching user details:', error));
    } else {
        document.getElementById('updateFields').style.display = 'none'; // Hide fields if no user is selected
    }
});

// Handle the form submission to update a user
document.getElementById('updateUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('userDropdown').value;

    const name = document.getElementById('updateName').value;
    // Validate name
    if (!validateName(name)) {
        alert('Name cannot contain numbers or special characters.');
        return; // Stop the form submission
    }

    const updatedData = {
        name: document.getElementById('updateName').value,
        email: document.getElementById('updateEmail').value,
        birthday: document.getElementById('updateBirthday').value,
        is_admin: document.getElementById('updateIsAdmin').checked,
        password: document.getElementById('updatePassword').value,
    };

    fetch(`/api/users/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('User updated successfully!');
        console.log(data);
        fetchUsers(); // Refresh the user dropdown and list
    })
    .catch(error => console.error('Error:', error));
});

// Handle the deletion of a user
document.getElementById('deleteUserButton').addEventListener('click', function() {
    const userId = document.getElementById('userDropdown').value;

    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('User deleted successfully!');
            console.log(data);
            fetchUsers(); // Refresh the user dropdown and list
        })
        .catch(error => console.error('Error deleting user:', error));
    }
});

// Fetch users on page load
document.addEventListener('DOMContentLoaded', fetchUsers);
