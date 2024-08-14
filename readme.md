

# Node Exam Project

## Description
This project is a Node.js application that uses MySQL for data storage. It includes scripts to manage the database, including creating tables and seeding initial data.


## Requirements
- Node.js (v16.x or later recommended)
- MySQL (or MariaDB)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/samanthaspillier/nodeExamProject.git
   cd nodeexamproject
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Database Setup

### Create the Database

Before running the `reset-db` script, ensure that the MySQL database `exam_nodejs` exists.

You can create the database manually using MySQL command-line tools or a MySQL client:

```sql
CREATE DATABASE exam_nodejs;
```

### Running the Reset Script

The `reset-db` script will drop existing tables, create new ones, and seed them with initial data. To run the script:

```bash
npm run reset-db
```

This script performs the following actions:
1. Drops existing tables if they exist.
2. Creates new tables according to the defined schema.
3. Seeds the tables with initial data.

## Usage

### Start the Application

To start the application, use:

```bash
npm start
```


## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MySQL](https://www.mysql.com/) - Open-source relational database management system
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM 
- [Postman Blogposts](https://blog.postman.com/how-to-build-an-api/) for starting with APIs
- [Dev.to blogpost](https://dev.to/jaimaldullat/a-step-by-step-guide-to-creating-a-restful-api-using-nodejs-and-express-including-crud-operations-and-authentication-2mo2#setting-up-the-development-environment) for starting with APIs
- ChatGPT 4o - [link to chat](https://chatgpt.com/share/2fd4017b-4c36-4464-8702-e8ade6aea748) for html layouts, adding bootstrap classes, debugging and code checks.
```

