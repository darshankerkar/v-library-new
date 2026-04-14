const fs = require('fs');
const path = require('path');
const pool = require('./db/connection');

async function run() {
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database_schema.sql'), 'utf8');
    const seedSql = fs.readFileSync(path.join(__dirname, '../seed_data.sql'), 'utf8');
    
    console.log('Running schema...');
    await pool.query(schemaSql);
    console.log('Schema created successfully.');
    
    console.log('Running seed data...');
    await pool.query(seedSql);
    console.log('Seed data inserted successfully.');
    
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

run();
