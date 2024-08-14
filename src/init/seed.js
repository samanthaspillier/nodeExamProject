const mysql = require('mysql2');
const connection = require('../config/mysql'); 

// Dummy data to seed the database
const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        birthday: '1990-01-01',
        is_admin: false,
        password: 'password!123'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        birthday: '1985-05-15',
        is_admin: true,
        password: 'password!123'
    },
    {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        birthday: '1992-09-23',
        is_admin: false,
        password: 'password!123'
    }
];

// Sample data to seed the posts table
const posts = [
    {
      title: 'First Post',
      content: 'This is the content of the first post.',
      user_id: 1, // Assuming you have a user with ID 1
    },
    {
      title: 'Second Post',
      content: 'This is the content of the second post.',
      user_id: 1,
    },
    {
      title: 'Third Post',
      content: 'This is the content of the third post.',
      user_id: 2, // Assuming you have a user with ID 2
    },
    {
      title: 'Fourth Post',
      content: 'This is the content of the fourth post.',
      user_id: 2,
    },
    {
      title: 'Fifth Post',
      content: 'This is the content of the fifth post.',
      user_id: 3, // Assuming you have a user with ID 3
    },
    {
      title: 'Sixth Post',
      content: 'This is the content of the sixth post.',
      user_id: 3,
    },
    {
      title: 'Seventh Post',
      content: 'This is the content of the seventh post.',
      user_id: 1,
    },
    {
      title: 'Eighth Post',
      content: 'This is the content of the eighth post.',
      user_id: 2,
    },
    {
      title: 'Ninth Post',
      content: 'This is the content of the ninth post.',
      user_id: 3,
    },
    {
      title: 'Tenth Post',
      content: 'This is the content of the tenth post.',
      user_id: 1,
    },
  ];
  

// Function to seed the database
function seedUsers() {
  return new Promise((resolve, reject) => {
    users.forEach((user, index) => {
      const query = `
        INSERT INTO users (name, email, birthday, is_admin, password)
        VALUES (?, ?, ?, ?, ?)
      `;
      connection.query(
        query, 
        [user.name, user.email, user.birthday, user.is_admin, user.password],
        (error, results) => {
          if (error) {
            reject('Error inserting user:', error);
          } else if (index === users.length - 1) {
            resolve();
          }
        }
      );
    });
  });
}

function seedPosts() {
  return new Promise((resolve, reject) => {
    posts.forEach((post, index) => {
      const query = `
        INSERT INTO posts (title, content, user_id)
        VALUES (?, ?, ?);
      `;
      connection.query(query, [post.title, post.content, post.user_id], (err, results) => {
        if (err) {
          reject('Error inserting post:', err);
        } else if (index === posts.length - 1) {
          resolve();
        }
      });
    });
  });
}

function seedDatabase() {
  return seedUsers().then(seedPosts);
}

// Export the seedDatabase function
module.exports = seedDatabase;





