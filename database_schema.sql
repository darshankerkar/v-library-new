CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100),
    birth_date DATE
);

CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    genre VARCHAR(100),
    author_id INT REFERENCES authors(author_id),
    total_copies INT NOT NULL
);

CREATE TABLE IF NOT EXISTS book_copies (
    copy_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    status VARCHAR(20) CHECK (status IN ('available','borrowed','reserved','damaged'))
);

CREATE TABLE IF NOT EXISTS members (
    member_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    membership_type VARCHAR(20) CHECK (membership_type IN ('student','faculty','public')),
    membership_end DATE
);

CREATE TABLE IF NOT EXISTS borrow_records (
    borrow_id SERIAL PRIMARY KEY,
    copy_id INT REFERENCES book_copies(copy_id),
    member_id INT REFERENCES members(member_id),
    borrow_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) CHECK (status IN ('active','returned','overdue'))
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    member_id INT REFERENCES members(member_id),
    reserved_on DATE DEFAULT CURRENT_DATE,
    expires_on DATE,
    status VARCHAR(20) CHECK (status IN ('pending','fulfilled','cancelled','expired'))
);

CREATE TABLE IF NOT EXISTS fines (
    fine_id SERIAL PRIMARY KEY,
    borrow_id INT REFERENCES borrow_records(borrow_id),
    amount DECIMAL(10,2),
    is_paid BOOLEAN DEFAULT FALSE,
    paid_on DATE
);
