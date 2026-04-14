const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT r.*, b.title, m.full_name 
      FROM reservations r
      JOIN books b ON r.book_id = b.book_id
      JOIN members m ON r.member_id = m.member_id
      ORDER BY r.reserved_on DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { book_id, member_id, expires_on } = req.body;
  try {
    const query = `
      INSERT INTO reservations (book_id, member_id, expires_on, status)
      VALUES ($1, $2, $3, 'pending') RETURNING *
    `;
    const result = await pool.query(query, [book_id, member_id, expires_on]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
