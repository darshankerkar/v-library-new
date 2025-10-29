import { useState, useEffect } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";

// Simple toast notification component
const showToast = (message, type) => {
  const toast = document.createElement('div');
  toast.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white font-semibold`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
};

// Subjects available for filtering (fixed list even if no books yet)
const subjects = [
  "Database",
  "Web Development",
  "Telecommunication",
  "Cloud Computing",
  "Operating Systems",
  "Software Engineering",
  "Distributed Systems",
];

// Sample book data
const sampleBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262046305",
    subject: "Software Engineering",
    totalCopies: 14,
    availableCopies: 6,
    availability: "Available",
    cover: "/Book1.jpeg",
    description: "The leading textbook on algorithms worldwide",
    category: "Computer Science",
    year: "2022",
    hasPdf: true
  },
  {
    id: 2,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    subject: "Software Engineering",
    totalCopies: 10,
    availableCopies: 0,
    availability: "Not Available",
    cover: "/Book2.jpg",
    description: "A collection of techniques for writing clean code",
    category: "Programming",
    year: "2008",
    hasPdf: true
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    isbn: "978-0201616224",
    subject: "Software Engineering",
    totalCopies: 9,
    availableCopies: 3,
    availability: "Available",
    cover: "/Book3.jpg",
    description: "Your journey to mastery",
    category: "Software Engineering",
    year: "2019",
    hasPdf: true
  },
  {
    id: 4,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gang of Four",
    isbn: "978-0201633612",
    subject: "Software Engineering",
    totalCopies: 8,
    availableCopies: 5,
    availability: "Available",
    cover: "/Book4.jpg",
    description: "The classic book on design patterns",
    category: "Software Design",
    year: "1994",
    hasPdf: true
  },
  {
    id: 5,
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    isbn: "978-1491952026",
    subject: "Web Development",
    totalCopies: 12,
    availableCopies: 7,
    availability: "Available",
    cover: "/Book5.jpg",
    description: "Master the world's most-used programming language",
    category: "Web Development",
    year: "2020",
    hasPdf: true
  },
  {
    id: 6,
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio",
    isbn: "978-0262035613",
    subject: "Software Engineering",
    totalCopies: 6,
    availableCopies: 0,
    availability: "Not Available",
    cover: "/Book6.jpg",
    description: "An introduction to a broad range of topics in deep learning",
    category: "Machine Learning",
    year: "2016",
    hasPdf: false
  },
  {
    id: 7,
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson, Gerald Jay Sussman",
    isbn: "978-0262510875",
    subject: "Software Engineering",
    totalCopies: 11,
    availableCopies: 4,
    availability: "Available",
    cover: "/Book7.jpeg",
    description: "The classic introduction to computer science",
    category: "Computer Science",
    year: "1996",
    hasPdf: true
  },
  {
    id: 8,
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry Korth",
    isbn: "978-0073523323",
    subject: "Database",
    totalCopies: 10,
    availableCopies: 6,
    availability: "Available",
    cover: "/Book8.jpg",
    description: "Fundamental database concepts",
    category: "Database Systems",
    year: "2019",
    hasPdf: false
  },
  {
    id: 9,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter Baer Galvin",
    isbn: "978-1119456339",
    subject: "Operating Systems",
    totalCopies: 13,
    availableCopies: 9,
    availability: "Available",
    cover: "/Book9.jpg",
    description: "Comprehensive coverage of operating system principles",
    category: "Operating Systems",
    year: "2018",
    hasPdf: false
  },
  {
    id: 10,
    title: "Introduction to Machine Learning",
    author: "Ethem Alpaydin",
    isbn: "978-0262047466",
    subject: "Cloud Computing",
    totalCopies: 7,
    availableCopies: 0,
    availability: "Not Available",
    cover: "/Book10.jpg",
    description: "A comprehensive introduction to machine learning",
    category: "Machine Learning",
    year: "2020",
    hasPdf: false
  },
  {
    id: 11,
    title: "Computer Networks and Communications",
    author: "Andrew S. Tanenbaum",
    isbn: "978-0130661029",
    subject: "Telecommunication",
    totalCopies: 9,
    availableCopies: 2,
    availability: "Available",
    cover: "/Book11.jpg",
    description: "Comprehensive guide to computer networking",
    category: "Computer Networks",
    year: "2021",
    hasPdf: false
  },
  {
    id: 12,
    title: "Software Engineering: Principles and Practice",
    author: "Hans van Vliet",
    isbn: "978-0471731717",
    subject: "Software Engineering",
    totalCopies: 8,
    availableCopies: 5,
    availability: "Available",
    cover: "/Book12.jpg",
    description: "Best practices in software development",
    category: "Software Engineering",
    year: "2018",
    hasPdf: false
  },
  {
    id: 13,
    title: "Network Security Essentials",
    author: "William Stallings",
    isbn: "978-0133370437",
    subject: "Telecommunication",
    totalCopies: 5,
    availableCopies: 0,
    availability: "Not Available",
    cover: "/Book13.jpg",
    description: "Essential network security principles",
    category: "Cybersecurity",
    year: "2019",
    hasPdf: false
  },
  {
    id: 14,
    title: "Distributed Systems: Concepts and Design",
    author: "George Coulouris",
    isbn: "978-0132143011",
    subject: "Distributed Systems",
    totalCopies: 10,
    availableCopies: 8,
    availability: "Available",
    cover: "/Book14.jpg",
    description: "Understanding distributed computing systems",
    category: "Distributed Systems",
    year: "2017",
    hasPdf: false
  },
  {
    id: 15,
    title: "Computer Architecture: A Quantitative Approach",
    author: "John L. Hennessy",
    isbn: "978-0123704900",
    subject: "Operating Systems",
    totalCopies: 7,
    availableCopies: 4,
    availability: "Available",
    cover: "/Book15.jpg",
    description: "Fundamental computer architecture concepts",
    category: "Computer Architecture",
    year: "2018",
    hasPdf: false
  },
];

function SearchBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState(new Set(subjects));
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = sampleBooks.filter((book) => {
      const matchesQuery =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        (book.subject || "").toLowerCase().includes(query);
      const matchesSubject = selectedSubjects.has(book.subject);
      return matchesQuery && matchesSubject;
    });

    setFilteredBooks(filtered);
  };

  const toggleSubject = (subject) => {
    const next = new Set(selectedSubjects);
    if (next.has(subject)) next.delete(subject); else next.add(subject);
    setSelectedSubjects(next);

    // Re-run filter using the latest query and branches
    const query = searchQuery.toLowerCase();
    const filtered = sampleBooks.filter((book) => {
      const matchesQuery =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        (book.subject || "").toLowerCase().includes(query);
      const matchesSubject = next.has(book.subject);
      return matchesQuery && matchesSubject;
    });
    setFilteredBooks(filtered);
  };

  const toggleWishlist = (book) => {
    const isInWishlist = wishlist.some((b) => b.id === book.id);
    
    if (isInWishlist) {
      setWishlist(wishlist.filter((b) => b.id !== book.id));
      showToast("Removed from wishlist", "success");
    } else {
      setWishlist([...wishlist, book]);
      showToast("Added to wishlist!", "success");
    }
  };

  const isInWishlist = (book) => {
    return wishlist.some((b) => b.id === book.id);
  };

  const handleBorrow = (book, days) => {
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate.getTime() + days * 24 * 60 * 60 * 1000);
    
    const borrowedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      borrowDate: borrowDate.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      days: days,
      category: book.category,
    };

    // Save to localStorage
    const borrowed = JSON.parse(localStorage.getItem("borrowed") || "[]");
    borrowed.push(borrowedBook);
    localStorage.setItem("borrowed", JSON.stringify(borrowed));

    // Show success message
    showToast(`"${book.title}" borrowed for ${days} days!`, "success");
    
    // Close modal
    setSelectedBook(null);
    
    // Navigate to dashboard after a short delay
  //   setTimeout(() => {
  //     window.location.href = "/dashboard";
  //   }, 1500);
  // 
  };

  return (
    <div className="outer-div bg-[#DFEDF5] min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/dashboard" className="text-white hover:text-blue-500 text-lg">
            <u>Dashboard</u>
          </a>
          <a href="/books" className="text-white hover:text-blue-500 text-lg">
            <u>Books</u>
          </a>
          <a href="/journals" className="text-white hover:text-blue-500 text-lg">
            <u>Journals</u>
          </a>
          <a href="/guides" className="text-white hover:text-blue-500 text-lg">
            <u>Guides</u>
          </a>
          <a href="/magazines" className="text-white hover:text-blue-500 text-lg">
            <u>Magazines</u>
          </a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 text-lg">
            <u>Dictionaries</u>
          </a>
          <a href="/search-books" className="text-white hover:text-blue-500 text-lg">
            <u>Search Books</u>
          </a>
          <a href="/reserves" className="text-white hover:text-blue-500 text-lg">
            <u>Reserves</u>
          </a>
        </div>
        {/* Desktop Search, Wishlist & Login */}
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <div 
            className="relative mr-4 cursor-pointer"
            onClick={() => setShowWishlist(!showWishlist)}
          >
            <FaHeart className={`text-white text-lg ${wishlist.length > 0 ? 'text-red-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          {showWishlist && (
            <div className="absolute top-full right-4 mt-2 bg-white rounded-lg shadow-xl w-80 max-h-96 overflow-y-auto z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">My Wishlist</h3>
              </div>
              {wishlist.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Your wishlist is empty
                </div>
              ) : (
                <div className="p-2">
                  {wishlist.map((book) => (
                    <div key={book.id} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded">
                      <img src={book.cover} alt={book.title} className="w-16 h-20 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{book.title}</h4>
                        <p className="text-xs text-gray-600">{book.author}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          book.availability === "Available" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {book.availability}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleWishlist(book)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaHeart className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            <a href="/login" className="text-white hover:text-blue-500 text-lg">
              <u>Log in</u>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <h1
          className="text-5xl md:text-7xl font-pacifico my-6 pl-[75px] pt-[30px]"
          style={{ fontFamily: "Caveat", color: "#605fe6" }}
        >
          Search Books
        </h1>

        {/* Search Box */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex items-center bg-[#f1f7fd] rounded-full border border-gray-300 px-6 flex-1">
                <FaSearch className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  placeholder="Search by title, author, ISBN, category, or subject..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-transparent flex-1 outline-none text-lg py-4"
                />
              </div>
              {/* Subject multi-select dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSubjectMenuOpen(!subjectMenuOpen)}
                  className="w-full md:w-auto bg-[#f1f7fd] border border-gray-300 hover:border-blue-400 rounded-full px-4 py-3 text-sm text-gray-700"
                >
                  Subjects: {selectedSubjects.size === subjects.length ? 'All' : `${selectedSubjects.size} selected`}
                </button>
                {subjectMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-3 max-h-80 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Filter subjects</span>
                      <div className="space-x-2">
                        <button
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() => {
                            const next = new Set(subjects);
                            setSelectedSubjects(next);
                            const query = searchQuery.toLowerCase();
                            const filtered = sampleBooks.filter((book) => {
                              const matchesQuery =
                                book.title.toLowerCase().includes(query) ||
                                book.author.toLowerCase().includes(query) ||
                                book.isbn.toLowerCase().includes(query) ||
                                book.category.toLowerCase().includes(query) ||
                                (book.subject || "").toLowerCase().includes(query);
                              const matchesSubject = next.has(book.subject);
                              return matchesQuery && matchesSubject;
                            });
                            setFilteredBooks(filtered);
                          }}
                        >
                          Select all
                        </button>
                        <button
                          className="text-xs text-gray-600 hover:underline"
                          onClick={() => {
                            const next = new Set();
                            setSelectedSubjects(next);
                            const query = searchQuery.toLowerCase();
                            const filtered = sampleBooks.filter((book) => {
                              const matchesQuery =
                                book.title.toLowerCase().includes(query) ||
                                book.author.toLowerCase().includes(query) ||
                                book.isbn.toLowerCase().includes(query) ||
                                book.category.toLowerCase().includes(query) ||
                                (book.subject || "").toLowerCase().includes(query);
                              const matchesSubject = next.has(book.subject);
                              return matchesQuery && matchesSubject;
                            });
                            setFilteredBooks(filtered);
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {subjects.map((s) => (
                        <label key={s} className="flex items-center gap-3 text-sm cursor-pointer px-2 py-1 rounded hover:bg-gray-50">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selectedSubjects.has(s)}
                            onChange={() => toggleSubject(s)}
                          />
                          <span className="select-none">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-center mt-3">
              Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Results with Sidebar Filter */}
        <div className="max-w-7xl mx-auto">
          {/* Table */}
          <section>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-50 text-gray-700 text-sm">
                    <tr>
                      <th className="px-4 py-3">Book</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Author</th>
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Copies</th>
                      <th className="px-4 py-3">Wishlist</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold">{book.title}</div>
                          <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
                        </td>
                        <td className="px-4 py-3">{book.author}</td>
                        <td className="px-4 py-3">{book.subject}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            book.availability === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {book.availability}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold">{book.availableCopies}</span>
                          <span className="text-gray-500"> / {book.totalCopies}</span>
                        </td>
                        <td className="px-4 py-3">
                  <button
                    onClick={() => toggleWishlist(book)}
                            className={`${isInWishlist(book) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                            aria-label="Toggle wishlist"
                  >
                    <FaHeart />
                  </button>
                        </td>
                        <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedBook(book)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded"
                  >
                            View
                  </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No books found matching your search.</p>
            </div>
          )}
            </div>
          </section>
        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Book Details</h2>
              <button
                onClick={() => setSelectedBook(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <img
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  className="w-48 h-64 object-cover rounded-lg mx-auto"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">{selectedBook.title}</h3>
                  <p className="text-gray-600 text-lg mb-4">by {selectedBook.author}</p>
                  <div className="space-y-2 mb-4">
                    <p><span className="font-semibold">ISBN:</span> {selectedBook.isbn}</p>
                    <p><span className="font-semibold">Category:</span> {selectedBook.category}</p>
                    <p><span className="font-semibold">Subject:</span> {selectedBook.subject}</p>
                    <p><span className="font-semibold">Year:</span> {selectedBook.year}</p>
                    <p><span className="font-semibold">Copies:</span> {selectedBook.availableCopies} / {selectedBook.totalCopies}</p>
                    <p>
                      <span className="font-semibold">Availability:</span>{" "}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedBook.availability === "Available" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {selectedBook.availability}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => toggleWishlist(selectedBook)}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      isInWishlist(selectedBook)
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    <FaHeart className="inline mr-2" />
                    {isInWishlist(selectedBook) ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                  
                  {/* Borrow Buttons */}
                  {selectedBook.availability === "Available" && (
                    <div className="mt-4">
                      <p className="font-semibold text-lg mb-3">Borrow Duration:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleBorrow(selectedBook, 15)}
                          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-semibold"
                        >
                          15 Days
                        </button>
                        <button
                          onClick={() => handleBorrow(selectedBook, 30)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-semibold"
                        >
                          30 Days
                        </button>
                        <button
                          onClick={() => handleBorrow(selectedBook, 90)}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors font-semibold"
                        >
                          3 Months
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Description</h4>
                <p className="text-gray-700">{selectedBook.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0 mt-8">
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
              <li>• <a href="https://vit.edu.in/rnd/" className="hover:underline hover:text-blue-200">R&amp;D</a></li>
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

export default SearchBooks;

