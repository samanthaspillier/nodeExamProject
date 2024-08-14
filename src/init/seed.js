const mysql = require('mysql2');
const connection = require('../config/mysql'); 

// Dummy data to seed the database
const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        birthday: '1990-01-01',
        avatar: 'https://example.com/avatar1.jpg',
        is_admin: false,
        password: 'password123'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        birthday: '1985-05-15',
        avatar: 'https://example.com/avatar2.jpg',
        is_admin: true,
        password: 'password456'
    },
    {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        birthday: '1992-09-23',
        avatar: 'https://example.com/avatar3.jpg',
        is_admin: false,
        password: 'password789'
    }
];

// Sample data to seed the posts table
const posts = [
    {
      title: 'First Post',
      content: 'This is the content of the first post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 1, // Assuming you have a user with ID 1
    },
    {
      title: 'Second Post',
      content: 'This is the content of the second post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 1,
    },
    {
      title: 'Third Post',
      content: 'This is the content of the third post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 2, // Assuming you have a user with ID 2
    },
    {
      title: 'Fourth Post',
      content: 'This is the content of the fourth post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 2,
    },
    {
      title: 'Fifth Post',
      content: 'This is the content of the fifth post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 3, // Assuming you have a user with ID 3
    },
    {
      title: 'Sixth Post',
      content: 'This is the content of the sixth post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 3,
    },
    {
      title: 'Seventh Post',
      content: 'This is the content of the seventh post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 1,
    },
    {
      title: 'Eighth Post',
      content: 'This is the content of the eighth post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 2,
    },
    {
      title: 'Ninth Post',
      content: 'This is the content of the ninth post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 3,
    },
    {
      title: 'Tenth Post',
      content: 'This is the content of the tenth post.',
      cover: 'https://via.placeholder.com/150',
      user_id: 1,
    },
  ];
  

// Function to seed the database
function seedUsers() {
    users.forEach((user) => {
        const query = `
            INSERT INTO users (name, email, birthday, avatar, is_admin, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        connection.query(
            query, 
            [user.name, user.email, user.birthday, user.avatar, user.is_admin, user.password],
            (error, results) => {
                if (error) {
                    console.error('Error inserting data:', error);
                } else {
                    console.log(`Inserted user with ID: ${results.insertId}`);
                }
            }
        );
    });
}

  // Function to seed the posts table
function seedPosts() {
posts.forEach(post => {
    const query = `
    INSERT INTO posts (title, content, cover, user_id)
    VALUES (?, ?, ?, ?);
    `;
    const values = [post.title, post.content, post.cover, post.user_id];

    connection.query(query, values, (err, results) => {
    if (err) {
        console.error('Error inserting post:', err.stack);
    } else {
        console.log('Post inserted with ID:', results.insertId);
    }
    });
});
}  


// Run the seed functions
function seedDatabase(){
  seedUsers();
  seedPosts();
}

// Call the function
seedDatabase();

// Export the function
module.exports = seedDatabase;



