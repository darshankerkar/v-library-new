const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT f.*, br.member_id, m.full_name, b.title
      FROM fines f
      JOIN borrow_records br ON f.borrow_id = br.borrow_id
      JOIN members m ON br.member_id = m.member_id
      JOIN book_copies bc ON br.copy_id = bc.copy_id
      JOIN books b ON bc.book_id = b.book_id
      ORDER BY f.is_paid ASC, f.fine_id DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:fine_id/pay', async (req, res) => {
  const { fine_id } = req.params;
  try {
    const query = `
      UPDATE fines SET is_paid = TRUE, paid_on = CURRENT_DATE
      WHERE fine_id = $1 RETURNING *
    `;
    const result = await pool.query(query, [fine_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fine not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
