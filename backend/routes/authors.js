const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM authors ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, nationality, birth_date } = req.body;
  try {
    const query = `
      INSERT INTO authors (name, nationality, birth_date)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const result = await pool.query(query, [name, nationality, birth_date]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
