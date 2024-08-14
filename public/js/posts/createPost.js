document.getElementById('postCreateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newPostData = {
        title: document.getElementById('createTitle').value,
        content: document.getElementById('createContent').value,
        cover: document.getElementById('createCover').value,
    };

    fetch('/post', {
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
        window.location.href = '/posts.html'; // Redirect to the posts list
    })
    .catch(error => console.error('Error:', error));
});
