const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// GET borrow records with details
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT br.*, b.title, a.name as author
      FROM borrow_records br
      JOIN book_copies bc ON br.copy_id = bc.copy_id
      JOIN books b ON bc.book_id = b.book_id
      LEFT JOIN authors a ON b.author_id = a.author_id
      ORDER BY br.borrow_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST borrow a book
router.post('/', async (req, res) => {
  const { book_id, member_id, due_date } = req.body;
  try {
    await pool.query('BEGIN');
    
    // Find an available copy
    const copyResult = await pool.query(
      'SELECT copy_id FROM book_copies WHERE book_id = $1 AND status = $2 LIMIT 1 FOR UPDATE',
      [book_id, 'available']
    );

    if (copyResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'No available copies for this book' });
    }

    const copy_id = copyResult.rows[0].copy_id;

    // Mark copy borrowed
    await pool.query('UPDATE book_copies SET status = $1 WHERE copy_id = $2', ['borrowed', copy_id]);

    // Insert borrow record
    const borrowResult = await pool.query(`
      INSERT INTO borrow_records (copy_id, member_id, due_date, status)
      VALUES ($1, $2, $3, 'active') RETURNING *
    `, [copy_id, member_id, due_date]);

    await pool.query('COMMIT');
    res.status(201).json(borrowResult.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST return a book
router.post('/return/:borrow_id', async (req, res) => {
  const { borrow_id } = req.params;
  try {
    await pool.query('BEGIN');
    
    // Get borrow record
    const borrowResult = await pool.query(
      'SELECT * FROM borrow_records WHERE borrow_id = $1 AND status = $2 FOR UPDATE',
      [borrow_id, 'active']
    );

    if (borrowResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Active borrow record not found' });
    }

    const record = borrowResult.rows[0];

    // Mark return date and status
    await pool.query(
      'UPDATE borrow_records SET return_date = CURRENT_DATE, status = $1 WHERE borrow_id = $2',
      ['returned', borrow_id]
    );

    // Update copy available
    await pool.query('UPDATE book_copies SET status = $1 WHERE copy_id = $2', ['available', record.copy_id]);

    // Check if overdue and generate fine
    const today = new Date();
    const dueDate = new Date(record.due_date);
    
    if (today > dueDate) {
      const diffTime = Math.abs(today - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const fineAmount = diffDays * 1.5; // Example: $1.50 per day
      
      await pool.query(
        'INSERT INTO fines (borrow_id, amount) VALUES ($1, $2)',
        [borrow_id, fineAmount]
      );
      
      // Update borrow status to overdue (optional, logic depends on requirements)
      await pool.query('UPDATE borrow_records SET status = $1 WHERE borrow_id = $2', ['overdue', borrow_id]);
    }

    await pool.query('COMMIT');
    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
