const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY full_name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { full_name, email, membership_type, membership_end } = req.body;
  try {
    const query = `
      INSERT INTO members (full_name, email, membership_type, membership_end)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await pool.query(query, [full_name, email, membership_type, membership_end]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
