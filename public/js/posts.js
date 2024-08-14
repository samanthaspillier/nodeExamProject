'use strict';

let currentPage = 1;
const postsPerPage = 6; // Number of posts per page

// Ensure that posts are fetched and displayed as soon as the page loads
window.onload = function() {
    fetchPosts();
};

// Function to fetch posts with pagination and search
function fetchPosts(page = 1, searchQuery = '') {
    const url = new URL('/posts', window.location.origin);
    url.searchParams.append('limit', postsPerPage);
    url.searchParams.append('offset', (page - 1) * postsPerPage);
    if (searchQuery) {
        url.searchParams.append('search', searchQuery);
    }

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
        .catch(error => {
            console.error('Error fetching posts:', error);
            alert('An error occurred while fetching posts. Please try again later.');
        });
}


// Function to display posts
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = ''; // Clear the list before displaying new posts

    if (posts.length === 0) {
        postsList.innerHTML = '<p class="text-center">No posts found.</p>';
        return;
    }

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('col-md-4', 'col-sm-6', 'mb-4'); // Bootstrap classes for responsive grid and spacing

        postItem.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <p class="card-text"><small class="text-muted">Author ID: ${post.user_id}</small></p>
                    <p class="card-text"><small class="text-muted">Created At: ${new Date(post.created_at).toLocaleDateString()}</small></p>
                </div>
            </div>
        `;
        postsList.appendChild(postItem);
    });
}


// Function to update pagination controls
function updatePaginationControls(page, totalPosts) {
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    prevPage.disabled = page === 1;
    nextPage.disabled = (page * postsPerPage) >= totalPosts;

    pageInfo.textContent = `Page ${page} of ${Math.ceil(totalPosts / postsPerPage)}`;
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


