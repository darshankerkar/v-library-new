import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaPlusCircle, FaBell } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // Load borrowed books from localStorage
  useEffect(() => {
    const borrowed = JSON.parse(localStorage.getItem("borrowed") || "[]");
    setBorrowedBooks(borrowed);
    
    // Check if any books are due soon (within 7 days) or overdue
    const today = new Date();
    const hasUrgent = borrowed.some((book) => {
      const dueDate = new Date(book.dueDate);
      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return daysLeft <= 7;
    });
    
    if (hasUrgent && borrowed.length > 0) {
      setShowNotification(true);
    }
  }, []);

  const handleReturn = (bookIndex) => {
    const book = borrowedBooks[bookIndex];
    
    // Remove from localStorage
    const updated = borrowedBooks.filter((_, index) => index !== bookIndex);
    localStorage.setItem("borrowed", JSON.stringify(updated));
    
    // Update state
    setBorrowedBooks(updated);
    
    // Show success message
    alert(`"${book.title}" has been successfully returned! Thank you for returning it early.`);
    
    // Hide notification if no books left or no urgent books
    if (updated.length === 0) {
      setShowNotification(false);
    } else {
      const today = new Date();
      const hasUrgent = updated.some((b) => {
        const dueDate = new Date(b.dueDate);
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        return daysLeft <= 7;
      });
      setShowNotification(hasUrgent);
    }
  };

  return (
    <div className="min-h-screen bg-[#a3f0ff] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Search Books", "Reserves"].map((item) => (
            <a key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-blue-500 text-lg">
              <u>{item}</u>
            </a>
          ))}
        </div>
        {/* Desktop Right */}
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <a href="/login" className="text-white hover:text-blue-500 text-lg">
            <u>Log in</u>
          </a>
        </div>
        {/* Hamburger */}
        <button
          className="flex flex-col justify-center items-center md:hidden ml-auto h-10 w-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Search Books", "Reserves"].map((item) => (
            <a key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>{item}</u>
            </a>
          ))}
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center">
            <u>Log in</u>
          </a>
        </div>
      )}

      {/* Notification Banner */}
      {showNotification && borrowedBooks.length > 0 && (
        <div className="bg-red-600 text-white p-4 mx-6 mt-2 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBell className="text-2xl" />
            <span className="font-semibold">
              Reminder: You have books due soon or overdue! Please return them.
            </span>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-white hover:text-gray-200 font-bold text-xl"
          >
            ×
          </button>
        </div>
      )}

      {/* // write your code here */}
      <main className="flex-grow p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 font-serif">Welcome, [User]</h1>
        <p className="text-lg text-black mb-6 font-serif">Your Borrowed Books</p>

        {/* Books Borrowed Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-red-600 text-3xl">🔴</span>Books Borrowed
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-black text-center text-black font-serif">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-black px-4 py-2">Book Name</th>
                  <th className="border border-black px-4 py-2">Author</th>
                  <th className="border border-black px-4 py-2">Borrow Date</th>
                  <th className="border border-black px-4 py-2">Due Date</th>
                  <th className="border border-black px-4 py-2">Duration</th>
                  <th className="border border-black px-4 py-2">Status</th>
                  <th className="border border-black px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.length === 0 ? (
                  <tr className="bg-gray-200">
                    <td colSpan="7" className="border border-black px-4 py-4">No books borrowed yet</td>
                  </tr>
                ) : (
                  borrowedBooks.map((book, index) => {
                    const today = new Date();
                    const dueDate = new Date(book.dueDate);
                    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    const isOverdue = daysLeft < 0;
                    const isDueSoon = daysLeft <= 7 && daysLeft >= 0;
                    
                    return (
                      <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                        <td className="border border-black px-4 py-2 font-semibold">{book.title}</td>
                        <td className="border border-black px-4 py-2">{book.author}</td>
                        <td className="border border-black px-4 py-2">{book.borrowDate}</td>
                        <td className="border border-black px-4 py-2">{book.dueDate}</td>
                        <td className="border border-black px-4 py-2">{book.days} Days</td>
                        <td className="border border-black px-4 py-2">
                          {isOverdue ? (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                              Overdue
                            </span>
                          ) : isDueSoon ? (
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold">
                              Due Soon ({daysLeft} days)
                            </span>
                          ) : (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="border border-black px-4 py-2">
                          <button
                            onClick={() => handleReturn(index)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                          >
                            Return
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Section */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-red-600 text-3xl">🔴</span>Actions:
          </h2>
          <button
            className="mt-3 mb-3 bg-[#5b33eb] hover:bg-[#4829c5] text-white font-semibold px-6 py-3 rounded-lg text-lg flex items-center gap-2"
            onClick={() => navigate("/search-books")}
          >
            Borrow a Book <FaPlusCircle />
          </button>
        </section>

        {/* Reminder */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mt-6 rounded">
          <p className="text-sm text-black font-semibold font-serif">
            <span className="text-blue-600 text-lg">ℹ️</span> <strong>Reminder:</strong> Use the library system responsibly. Return books on time and maintain proper decorum to avoid penalties.
          </p>
          {borrowedBooks.some(book => {
            const today = new Date();
            const dueDate = new Date(book.dueDate);
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            return daysLeft <= 3 && daysLeft >= 0;
          }) && (
            <p className="text-sm text-red-600 font-bold mt-2">
              ⚠️ You have books due within 3 days! Please return them soon.
            </p>
          )}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0  bottom-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and Subscribe */}
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-8 md:mb-0">
            <div className="flex flex-col sm:flex-row items-center md:items-start mb-6">
              <img
                src="/Logo-VIT.png"
                alt="VIT Logo"
                className="h-16 sm:h-20 mr-0 sm:mr-3 mb-2 sm:mb-0"
              />
            </div>
            <form className="flex w-full max-w-xs mt-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="rounded-l-md px-4 py-2 w-full text-gray-800 focus:outline-none"
                style={{ backgroundColor: "white" }}
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-r-md font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Contact Us */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2 text-base">
              <li>
                <span className="mr-2">
                  <i className="fa-solid fa-graduation-cap"></i>
                </span>
                Vidyalankar Institute of Technology,
                <br />
                Vidyalankar College Marg, Wadala(E),
                <br />
                Mumbai-400 037
              </li>
              <li>
                <span className="mr-2">
                  <i className="fa-solid fa-phone"></i>
                </span>
                +91 22 2416 11 40
              </li>
              <li>
                <span className="mr-2">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <a href="https://vit.edu.in/email-us/" className="hover:underline hover:text-blue-200">
    Write to Us
  </a>
              </li>
              <li>
                <span className="mr-2">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <a href="https://vit.edu.in/getdirections/" className="hover:underline hover:text-blue-200">
    Get Directions
  </a>
              </li>
            </ul>
          </div>
          {/* Academics */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Academics</h3>
            <ul className="space-y-2 text-base">
              <li>
      • <a href="https://vit.edu.in/information-technology/" className="hover:underline hover:text-blue-200">Information Technology</a>
    </li>
    <li>
      • <a href="https://vit.edu.in/computer-engineering/" className="hover:underline hover:text-blue-200">Computer Engineering</a>
    </li>
    <li>
      • <a href="https://vit.edu.in/electronics-and-computer-science/" className="hover:underline hover:text-blue-200">Electronics and Computer Science</a>
    </li>
    <li>
      • <a href="https://vit.edu.in/electronics-telecommunication-engineering/" className="hover:underline hover:text-blue-200">Electronics and Telecommunication Engineering</a>
    </li>
    <li>
      • <a href="https://vit.edu.in/biomedical-engineering/" className="hover:underline hover:text-blue-200">Biomedical Engineering</a>
    </li>
    <li>
      • <a href="https://vit.edu.in/management/" className="hover:underline hover:text-blue-200">Management Studies</a>
    </li>
            </ul>
          </div>
          {/* Website */}
          <div className="md:w-1/4">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Website</h3>
            <ul className="space-y-2 text-base">
              <li>• <a href="https://vit.edu.in/" className="hover:underline hover:text-blue-200">Home</a></li>
              <li>• <a href="https://vit.edu.in/about-us/" className="hover:underline hover:text-blue-200">Who We Are</a></li>
              <li>• <a href="https://vit.edu.in/contact/" className="hover:underline hover:text-blue-200">Contact Us</a></li>
              <li>• <a href="https://vit.edu.in/terms-condition/" className="hover:underline hover:text-blue-200">Terms & Conditions</a></li>
              <li>• <a href="https://vit.edu.in/privacy-policy/" className="hover:underline hover:text-blue-200">Privacy Policy</a></li>
              <li>• <a href="https://vit.edu.in/rnd/  " className="hover:underline hover:text-blue-200">R&amp;D</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-blue-200" />
        <div className="text-center text-base">
          © 2025 All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
