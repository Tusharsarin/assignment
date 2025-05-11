require('dotenv').config();

require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});


// migration.js

async function runMigration() {
  try {
    // Create the 'users' table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        interest TEXT[],
        age INTEGER,
        mobile BIGINT,
        email VARCHAR(255) UNIQUE NOT NULL
      );
    `;
    await pool.query(createTableQuery);
    console.log('✅ "users" table created successfully');

    // Create indexes
    const createIndexes = [
      `CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);`,
      `CREATE INDEX IF NOT EXISTS idx_users_interest ON users USING GIN (interest);`,
      `CREATE INDEX IF NOT EXISTS idx_users_age ON users(age);`,
      `CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);`
    ];

    for (const query of createIndexes) {
      await pool.query(query);
    }

  } catch (err) {
    console.error('❌ Error during migration:', err.stack);
  }
}


module.exports = {
  pool,
  runMigration
};
