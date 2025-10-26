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

// Sample book data
const sampleBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262046305",
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

    const filtered = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );

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

  return (
    <div className="outer-div bg-[#DFEDF5] min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8">
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
          <a href="/search-books" className="text-white hover:text-blue-500 text-lg bg-blue-700 px-2 py-1 rounded">
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
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center bg-[#f1f7fd] rounded-full border border-gray-300 px-6 mb-4">
              <FaSearch className="text-gray-500 text-xl mr-3" />
              <input
                type="text"
                placeholder="Search by title, author, ISBN, or category..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent flex-1 outline-none text-lg py-4"
              />
            </div>
            <p className="text-gray-600 text-center">
              Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Books Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(book)}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg transition-all ${
                      isInWishlist(book) 
                        ? "text-red-500" 
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <FaHeart />
                  </button>
                  <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    book.availability === "Available" 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}>
                    {book.availability}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                  <p className="text-xs text-gray-500 mb-2">ISBN: {book.isbn}</p>
                  <p className="text-xs text-gray-500 mb-3">{book.category} • {book.year}</p>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No books found matching your search.</p>
            </div>
          )}
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
                    <p><span className="font-semibold">Year:</span> {selectedBook.year}</p>
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

