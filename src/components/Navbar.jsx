import { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 shrink-0">
          <Link to="/" className="cursor-pointer">
            <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <Link to="/dashboard" className="text-white hover:text-blue-500 text-lg">
            <u>Dashboard</u>
          </Link>
          <Link to="/books" className="text-white hover:text-blue-500 text-lg">
            <u>Books</u>
          </Link>
          <Link to="/journals" className="text-white hover:text-blue-500 text-lg">
            <u>Journals</u>
          </Link>
          <Link to="/guides" className="text-white hover:text-blue-500 text-lg">
            <u>Guides</u>
          </Link>
          <Link to="/magazines" className="text-white hover:text-blue-500 text-lg">
            <u>Magazines</u>
          </Link>
          <Link to="/dictionaries" className="text-white hover:text-blue-500 text-lg">
            <u>Dictionaries</u>
          </Link>
          <Link to="/search-books" className="text-white hover:text-blue-500 text-lg">
            <u>Search Books</u>
          </Link>
          <Link to="/reserves" className="text-white hover:text-blue-500 text-lg">
            <u>Reserves</u>
          </Link>
        </div>
        {/* Desktop Search & Login/User Profile */}
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            {user ? (
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle className="text-white text-2xl" />
                )}
                <span className="text-white text-lg">{user.displayName}</span>
                <button onClick={handleLogout} className="text-white hover:text-red-400 text-lg">
                  <u>Logout</u>
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-500 text-lg">
                <u>Log in</u>
              </Link>
            )}
          </div>
        </div>
        {/* Hamburger Icon (mobile only) */}
        <button
          className="flex flex-col justify-center items-center md:hidden ml-auto h-10 w-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          <Link
            to="/dashboard"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Dashboard</u>
          </Link>
          <Link
            to="/books"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Books</u>
          </Link>
          <Link
            to="/journals"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Journals</u>
          </Link>
          <Link
            to="/guides"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Guides</u>
          </Link>
          <Link
            to="/magazines"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Magazines</u>
          </Link>
          <Link
            to="/dictionaries"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Dictionaries</u>
          </Link>
          <Link
            to="/search-books"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Search Books</u>
          </Link>
          <Link
            to="/reserves"
            className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
          >
            <u>Reserves</u>
          </Link>
          <div className="flex items-center w-full">
            <div className="h-6 w-px bg-blue-200 mx-auto"></div>
          </div>
          {user ? (
            <div className="flex flex-col items-center gap-3 text-white py-2 text-lg w-full text-center">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle className="text-white text-2xl" />
                )}
                <span>{user.displayName}</span>
              </div>
              <button onClick={handleLogout} className="text-white hover:text-red-400 text-lg">
                <u>Logout</u>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center"
            >
              <u>Log in</u>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;