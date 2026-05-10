-- Insert 5 authors
INSERT INTO authors (name, nationality, birth_date) VALUES 
('J.K. Rowling', 'British', '1965-07-31'),
('George R.R. Martin', 'American', '1948-09-20'),
('J.R.R. Tolkien', 'British', '1892-01-03'),
('Isaac Asimov', 'American', '1920-01-02'),
('Agatha Christie', 'British', '1890-09-15');

-- Insert 10 books
INSERT INTO books (title, isbn, genre, author_id, total_copies) VALUES
('Harry Potter and the Sorcerers Stone', '9780747532699', 'Fantasy', 1, 3),
('Harry Potter and the Chamber of Secrets', '9780747538493', 'Fantasy', 1, 2),
('A Game of Thrones', '9780553103540', 'Fantasy', 2, 2),
('A Clash of Kings', '9780553108033', 'Fantasy', 2, 2),
('The Hobbit', '9780261102217', 'Fantasy', 3, 2),
('The Fellowship of the Ring', '9780261102354', 'Fantasy', 3, 2),
('Foundation', '9780553293357', 'Sci-Fi', 4, 2),
('Foundation and Empire', '9780553293371', 'Sci-Fi', 4, 1),
('Murder on the Orient Express', '9780007119318', 'Mystery', 5, 2),
('And Then There Were None', '9780312330873', 'Mystery', 5, 2);

-- Insert 20 book copies (matching the total_copies above, summing to 20 total copies)
INSERT INTO book_copies (book_id, status) VALUES 
(1, 'available'), (1, 'available'), (1, 'borrowed'),
(2, 'available'), (2, 'borrowed'),
(3, 'available'), (3, 'available'),
(4, 'available'), (4, 'reserved'),
(5, 'available'), (5, 'borrowed'),
(6, 'available'), (6, 'available'),
(7, 'available'), (7, 'available'),
(8, 'damaged'),
(9, 'available'), (9, 'available'),
(10, 'borrowed'), (10, 'available');

-- Insert 5 members
INSERT INTO members (full_name, email, membership_type, membership_end) VALUES
('John Doe', 'john.doe@example.com', 'student', '2026-12-31'),
('Jane Smith', 'jane.smith@example.com', 'faculty', '2027-12-31'),
('Alice Johnson', 'alice.j@example.com', 'student', '2025-06-30'),
('Bob Brown', 'bob.b@example.com', 'public', '2026-01-15'),
('Charlie Davis', 'charlie.d@example.com', 'public', '2026-08-20');

-- Some initial borrow records
INSERT INTO borrow_records (copy_id, member_id, borrow_date, due_date, status) VALUES
(3, 1, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '9 days', 'active'),
(5, 2, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '4 days', 'active'),
(11, 3, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '6 days', 'overdue'),
(19, 4, CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '12 days', 'active');

-- Some existing fines
INSERT INTO fines (borrow_id, amount, is_paid) VALUES
(3, 15.00, FALSE);
