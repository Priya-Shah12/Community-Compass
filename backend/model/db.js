const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'community_compass',
};

// Create a connection pool attached to the specific database
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize Database and Tables
async function initDB() {
  try {
    // 1. Connect without database to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await connection.end();

    console.log('Connected to MySQL database.');

    // 2. Create Tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS find_lost_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        contactInfo VARCHAR(255) NOT NULL,
        image LONGTEXT,
        createdAt VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'active'
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS help_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        urgency VARCHAR(50) NOT NULL,
        contactName VARCHAR(255) NOT NULL,
        contactPhone VARCHAR(255) NOT NULL,
        createdAt VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'active'
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS volunteers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        requestId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        message TEXT,
        acceptedAt VARCHAR(50) NOT NULL,
        FOREIGN KEY (requestId) REFERENCES help_requests(id) ON DELETE CASCADE
      )
    `);

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        mobile VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt VARCHAR(50) NOT NULL
      )
    `);

    console.log('MySQL Tables configured successfully.');
  } catch (err) {
    console.error('Error initializing MySQL database:', err.message);
    console.error('Please make sure your MySQL server (like XAMPP or WAMP) is running on localhost!');
  }
}

module.exports = { pool, initDB };
