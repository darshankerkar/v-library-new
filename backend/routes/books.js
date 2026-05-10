const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// GET all books with available copies count
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT b.book_id, b.title, b.isbn, b.genre, b.total_copies,
             a.name as author_name,
             (SELECT COUNT(*) FROM book_copies bc WHERE bc.book_id = b.book_id AND bc.status = 'available') as available_copies
      FROM books b
      LEFT JOIN authors a ON b.author_id = a.author_id
      ORDER BY b.title;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add a book
router.post('/', async (req, res) => {
  const { title, isbn, genre, author_id, total_copies } = req.body;
  try {
    await pool.query('BEGIN');
    const insertBookQuery = `
      INSERT INTO books (title, isbn, genre, author_id, total_copies)
      VALUES ($1, $2, $3, $4, $5) RETURNING book_id
    `;
    const bookResult = await pool.query(insertBookQuery, [title, isbn, genre, author_id, total_copies]);
    const book_id = bookResult.rows[0].book_id;

    // Add copies
    for (let i = 0; i < total_copies; i++) {
      await pool.query('INSERT INTO book_copies (book_id, status) VALUES ($1, $2)', [book_id, 'available']);
    }

    await pool.query('COMMIT');
    res.status(201).json({ message: 'Book and copies added successfully', book_id });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
