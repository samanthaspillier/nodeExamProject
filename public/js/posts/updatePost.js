// Assuming the post ID is passed as a query parameter to the updatePost.html
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

fetch(`/post/${postId}`)
    .then(response => response.json())
    .then(post => {
        document.getElementById('updateTitle').value = post.title;
        document.getElementById('updateContent').value = post.content;
        document.getElementById('updateCover').value = post.cover;
    })
    .catch(error => console.error('Error fetching post:', error));

document.getElementById('postUpdateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const updatedData = {
        title: document.getElementById('updateTitle').value,
        content: document.getElementById('updateContent').value,
        cover: document.getElementById('updateCover').value,
    };

    fetch(`/post/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error updating post');
        }
        return response.json();
    })
    .then(() => {
        alert('Post updated successfully!');
        window.location.href = '/posts.html'; // Redirect to the posts list
    })
    .catch(error => console.error('Error:', error));
});
