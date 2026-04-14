import { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";

function LibrarianPage() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="bg-[#DFEDF5] min-h-screen flex flex-col font-inter">
      <Navbar />
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-pacifico my-6 text-[#605fe6] pt-4" style={{ fontFamily: "Caveat" }}>
          Librarian Dashboard
        </h1>

        <div className="flex space-x-4 mb-6 border-b-2 border-gray-300 pb-2">
          {["books", "authors", "members", "reservations", "fines"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Manage {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          {activeTab === "books" && <ManageBooks />}
          {activeTab === "authors" && <ManageAuthors />}
          {activeTab === "members" && <ManageMembers />}
          {activeTab === "reservations" && <ManageReservations />}
          {activeTab === "fines" && <ManageFines />}
        </div>
      </div>
    </div>
  );
}

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', isbn: '', genre: '', author_id: '', total_copies: 1 });

  useEffect(() => { fetchBooks(); fetchAuthors(); }, []);

  const fetchBooks = () => fetch("http://localhost:3000/api/books").then(res => res.json()).then(setBooks).catch(console.error);
  const fetchAuthors = () => fetch("http://localhost:3000/api/authors").then(res => res.json()).then(setAuthors).catch(console.error);

  const handleAddBook = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/books", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newBook)
    }).then(() => { fetchBooks(); setNewBook({ title: '', isbn: '', genre: '', author_id: '', total_copies: 1 }); });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input type="text" placeholder="Title" required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="border p-2 rounded w-full" />
        <input type="text" placeholder="ISBN" required value={newBook.isbn} onChange={e => setNewBook({...newBook, isbn: e.target.value})} className="border p-2 rounded w-full" />
        <input type="text" placeholder="Genre" required value={newBook.genre} onChange={e => setNewBook({...newBook, genre: e.target.value})} className="border p-2 rounded w-full" />
        <select required value={newBook.author_id} onChange={e => setNewBook({...newBook, author_id: e.target.value})} className="border p-2 rounded w-full">
          <option value="">Select Author...</option>
          {authors.map(a => <option key={a.author_id} value={a.author_id}>{a.name}</option>)}
        </select>
        <input type="number" placeholder="Total Copies" required min="1" value={newBook.total_copies} onChange={e => setNewBook({...newBook, total_copies: parseInt(e.target.value)})} className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700">Add Book</button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Current Books</h2>
      <ul className="divide-y max-h-96 overflow-y-auto border rounded p-4">
        {books.map(b => (
          <li key={b.book_id} className="py-2 flex justify-between">
            <span><b>{b.title}</b> ({b.genre}) - {b.author_name}</span>
            <span className="text-sm bg-gray-200 px-2 py-1 rounded">Copies: {b.available_copies}/{b.total_copies}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ManageAuthors() {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: '', nationality: '', birth_date: '' });

  useEffect(() => { fetchAuthors(); }, []);

  const fetchAuthors = () => fetch("http://localhost:3000/api/authors").then(res => res.json()).then(setAuthors).catch(console.error);

  const handleAddAuthor = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/authors", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newAuthor)
    }).then(() => { fetchAuthors(); setNewAuthor({ name: '', nationality: '', birth_date: '' }); });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add a New Author</h2>
      <form onSubmit={handleAddAuthor} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input type="text" placeholder="Name" required value={newAuthor.name} onChange={e => setNewAuthor({...newAuthor, name: e.target.value})} className="border p-2 rounded w-full" />
        <input type="text" placeholder="Nationality" value={newAuthor.nationality} onChange={e => setNewAuthor({...newAuthor, nationality: e.target.value})} className="border p-2 rounded w-full" />
        <input type="date" placeholder="Birth Date" value={newAuthor.birth_date} onChange={e => setNewAuthor({...newAuthor, birth_date: e.target.value})} className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700">Add Author</button>
      </form>
      <ul className="list-disc pl-5">
        {authors.map(a => <li key={a.author_id}>{a.name} ({a.nationality})</li>)}
      </ul>
    </div>
  );
}

function ManageMembers() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ full_name: '', email: '', membership_type: 'student', membership_end: '' });

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = () => fetch("http://localhost:3000/api/members").then(res => res.json()).then(setMembers).catch(console.error);

  const handleRegisterMember = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/members", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newMember)
    }).then(() => { fetchMembers(); setNewMember({ full_name: '', email: '', membership_type: 'student', membership_end: '' }); });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register Member</h2>
      <form onSubmit={handleRegisterMember} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input type="text" placeholder="Full Name" required value={newMember.full_name} onChange={e => setNewMember({...newMember, full_name: e.target.value})} className="border p-2 rounded w-full" />
        <input type="email" placeholder="Email" required value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} className="border p-2 rounded w-full" />
        <select value={newMember.membership_type} onChange={e => setNewMember({...newMember, membership_type: e.target.value})} className="border p-2 rounded w-full">
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="public">Public</option>
        </select>
        <input type="date" title="Membership End" required value={newMember.membership_end} onChange={e => setNewMember({...newMember, membership_end: e.target.value})} className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700">Register</button>
      </form>
      <ul className="list-disc pl-5">
        {members.map(m => <li key={m.member_id}>{m.full_name} - {m.membership_type}</li>)}
      </ul>
    </div>
  );
}

function ManageReservations() {
  const [reserves, setReserves] = useState([]);
  useEffect(() => { fetch("http://localhost:3000/api/reservations").then(res => res.json()).then(setReserves).catch(console.error); }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Reservations</h2>
      {reserves.length === 0 ? <p>No reservations currently.</p> : (
        <table className="min-w-full border shadow">
          <thead className="bg-gray-100"><tr><th className="p-2 text-left">Book</th><th className="p-2 text-left">Member</th><th className="p-2 text-left">Expires</th><th className="p-2 text-left">Status</th></tr></thead>
          <tbody>
            {reserves.map(r => (
              <tr key={r.reservation_id} className="border-t"><td className="p-2">{r.title}</td><td className="p-2">{r.full_name}</td><td className="p-2">{new Date(r.expires_on).toLocaleDateString()}</td><td className="p-2">{r.status}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function ManageFines() {
  const [fines, setFines] = useState([]);
  
  useEffect(() => { fetchFines(); }, []);
  const fetchFines = () => fetch("http://localhost:3000/api/fines").then(res => res.json()).then(setFines).catch(console.error);

  const payFine = (fine_id) => {
    fetch(`http://localhost:3000/api/fines/${fine_id}/pay`, { method: "POST" })
      .then(() => fetchFines()).catch(console.error);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Outstanding & Paid Fines</h2>
      {fines.length === 0 ? <p>No fines found.</p> : (
        <table className="min-w-full border shadow">
          <thead className="bg-gray-100"><tr><th className="p-2 text-left">Member</th><th className="p-2 text-left">Book</th><th className="p-2 text-left">Amount ($)</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Action</th></tr></thead>
          <tbody>
            {fines.map(f => (
              <tr key={f.fine_id} className="border-t">
                <td className="p-2">{f.full_name}</td>
                <td className="p-2">{f.title}</td>
                <td className="p-2">${f.amount}</td>
                <td className="p-2">{f.is_paid ? 'Paid' : 'Unpaid'}</td>
                <td className="p-2">
                  {!f.is_paid && <button onClick={() => payFine(f.fine_id)} className="bg-green-500 text-white px-3 py-1 rounded">Mark Paid</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LibrarianPage;