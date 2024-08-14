'use strict';

// Function to fetch post data and populate the form
function loadPostData(postId) {
    console.log("loading post data fetch by id")
    fetch(`/api/posts/post/${postId}`) //refer to postRoutes.js
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(post => {
            // fill with database data
            document.getElementById('updateTitle').value = post.title || '';
            document.getElementById('updateContent').value = post.content || '';
        })
        .catch(error => console.error('Error fetching post data:', error));
}

// Run when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const postId = urlParams.get('id'); // Get postId from query string
    console.log(postId)

    if (postId) {
        loadPostData(postId);

    } else {
        console.error('No post ID provided in the URL.');
    }
});

// Form submission to update the post
document.getElementById('postUpdateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); // Get postId from query string

    if (!postId) {
        console.error('No post ID found in the URL.');
        return;
    }

    const updatedPostData = {
        title: document.getElementById('updateTitle').value,
        content: document.getElementById('updateContent').value,
    };

    console.log('Updating post with ID:', postId);
    console.log('Updated data:', updatedPostData);

    fetch(`/api/posts/post/${postId}`, { // Refer to postRoutes.js
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPostData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert("Post updated successfully!");
        console.log('Response data:', data);
        window.location.href = '/posts/posts.html'; 
    })
    .catch(error => console.error('Error updating post:', error));
});
