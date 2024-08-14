'use strict';

let currentPage = 1;
const postsPerPage = 5; // Number of posts per page

// Function to fetch posts with pagination and search
function fetchPosts(page = 1, searchQuery = '') {
    const url = new URL('/api/posts', window.location.origin);
    url.searchParams.append('limit', postsPerPage);
    url.searchParams.append('offset', (page - 1) * postsPerPage);
    if (searchQuery) {
        url.searchParams.append('search', searchQuery);
    }

    console.log('Fetching URL:', url.toString()); // Print URL for debugging

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayPosts(data.posts);
            updatePaginationControls(page, data.total);
        })
        .catch(error => console.error('Error fetching posts:', error));
}



// Function to display posts
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = ''; // Clear the list before displaying new posts

    if (posts.length === 0) {
        postsList.innerHTML = '<p>No posts found.</p>';
        return;
    }

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('col-md-4'); // Bootstrap class for grid
        postItem.classList.add('mb-4'); // Margin bottom
        
        postItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <p class="card-text"><small class="text-muted">Author ID: ${post.user_id}</small></p>
                    <p class="card-text"><small class="text-muted">Created At: ${new Date(post.created_at).toLocaleDateString()}</small></p>
                    <button class="btn btn-warning btn-sm" onclick="window.location.href='/posts/updatePost.html?id=${post.id}'">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        `;
        postsList.appendChild(postItem);
    });
}


// Function to update pagination controls
function updatePaginationControls(page, postsCount) {
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    prevPage.disabled = page === 1;
    nextPage.disabled = postsCount < postsPerPage;

    pageInfo.textContent = `Page ${page}`;
}

// Function to handle the delete button click
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        fetch(`/post/${postId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting post');
            }
            return response.json();
        })
        .then(() => {
            alert('Post deleted successfully!');
            fetchPosts(currentPage); // Reload posts after deletion
        })
        .catch(error => console.error('Error:', error));
    }
}

// Event listener for pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPosts(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchPosts(currentPage);
});

// Event listener for search button
document.getElementById('searchButton').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchInput').value.trim();
    currentPage = 1; // Reset to first page when searching
    fetchPosts(currentPage, searchQuery);
});

// Initial fetch of posts when the page loads
window.onload = function() {
    fetchPosts();
};
