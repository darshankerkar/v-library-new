const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const membersRouter = require('./routes/members');
const borrowRouter = require('./routes/borrow');
const reservationsRouter = require('./routes/reservations');
const finesRouter = require('./routes/fines');

app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/members', membersRouter);
app.use('/api/borrow', borrowRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/fines', finesRouter);

// Dashboard stats endpoint
app.get('/api/stats', async (req, res) => {
  const pool = require('./db/connection');
  try {
    const totalBooksObj = await pool.query('SELECT COUNT(*) FROM books');
    const totalMembersObj = await pool.query('SELECT COUNT(*) FROM members');
    const borrowedBooksObj = await pool.query('SELECT COUNT(*) FROM book_copies WHERE status = $1', ['borrowed']);
    const overdueBooksObj = await pool.query('SELECT COUNT(*) FROM borrow_records WHERE status = $1', ['overdue']);
    
    res.json({
      totalBooks: parseInt(totalBooksObj.rows[0].count),
      totalMembers: parseInt(totalMembersObj.rows[0].count),
      borrowedBooks: parseInt(borrowedBooksObj.rows[0].count),
      overdueBooks: parseInt(overdueBooksObj.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
