# VLibrary - Full-Stack Library Management System (DBMS)

VLibrary is a comprehensive digital library platform transformed into a full-stack **DBMS project**. It utilizes a modern tech stack to handle book inventory, member registrations, and real-time borrowing transactions with automated fine calculations.

---

## 🚀 Getting Started

To run this project locally, follow these steps in order:

### 1. Database Setup (Neon PostgreSQL)
The project uses a Neon PostgreSQL database. Ensure your `.env` file in the `backend/` folder contains the correct `DATABASE_URL`.

**Initialize the Database:**
This step creates the tables and inserts initial sample data.
```bash
cd backend
npm run init-db
```

### 2. Start the Backend (Node.js + Express)
Open a new terminal and run:
```bash
cd backend
npm run dev
```
The server will start on `http://localhost:3000`.

### 3. Start the Frontend (React + Vite)
Open another terminal (in the root project directory) and run:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** Neon PostgreSQL (Cloud)
- **Database Driver:** `pg` (node-postgres)

---

## 📂 Project Structure
- `/pages`: React components for Dashboard, Search, Librarian controls, etc.
- `/backend`: Express server logic.
  - `/routes`: API endpoints for Books, Members, Borrowing, and Fines.
  - `database_schema.sql`: SQL code for the relational schema.
  - `seed_data.sql`: Initial sample data.

---

## 📖 Key Pages to Explore
- **Dashboard (`/dashboard`):** Real-time statistics fetched from Neon DB.
- **Search Books (`/search-books`):** Browse and borrow books directly into the database.
- **Librarian Dashboard (`/librarian`):** **[ADMIN]** Add new books, authors, register members, and manage fines/returns.
- **Reserves (`/reserves`):** View currently reserved course materials from the DB.

---

## 🏗️ Database Schema Summary
This project implements a normalized relational database with the following entities:
1. `authors` - Master list of writers.
2. `books` - Catalog of book titles and ISBNs.
3. `book_copies` - Individual physical copies with unique status tracking.
4. `members` - Registered students and faculty.
5. `borrow_records` - Live log of which member has which book.
6. `reservations` - Waitlist for popular items.
7. `fines` - Automatically generated penalty records for late returns.

---

## 📋 Database Implementation Features
- **ACID Transactions:** Ensures data consistency during borrowing and returns.
- **Referential Integrity:** Uses Foreign Keys to link authors, books, and members.
- **Complexity:** Automated fine generation based on `due_date` comparison in SQL.
- **Normalization:** Designed up to 3rd Normal Form (3NF) to minimize redundancy.
