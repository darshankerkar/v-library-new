const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // Make sure dotenv is configured if testing from script
require('dotenv').config(); // Fallback for standard execution

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
