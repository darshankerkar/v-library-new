import { useState } from "react";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";

function Journals() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCal, setShowCal] = useState(false);

  // Get today's date in desired format
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Example journals data
  const journals = [
    {
      title: "IEEE Xplore",
      desc: "Access to IEEE journals, conferences, and standards in engineering and technology.",
      link: "https://ieeexplore.ieee.org/",
      type: "International",
    },
    {
      title: "Springer Journals",
      desc: "Wide range of scientific, technical, and medical journals.",
      link: "https://link.springer.com/",
      type: "International",
    },
    {
      title: "Indian Journals",
      desc: "Collection of national journals across various disciplines.",
      link: "https://www.indianjournals.com/",
      type: "National",
    },
    {
      title: "ACM Digital Library",
      desc: "Comprehensive collection of ACM publications and resources.",
      link: "https://dl.acm.org/",
      type: "International",
    },
    {
      title: "Economic Outlook (CMIE)",
      desc: "Indian economic and industry data and journals.",
      link: "https://www.cmie.com/",
      type: "National",
    },
    {
      title: "Nature Publishing Group",
      desc: "Leading science journals including Nature and Scientific American.",
      link: "https://www.nature.com/",
      type: "International",
    },
    // Add more as needed
  ];

  return (
    <>
      <div className="min-h-screen bg-[#DFEDF5] flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
          <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
            <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 items-center gap-x-8 ">
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
          {/* Desktop Search & Login */}
          <div className="hidden md:flex items-center ml-auto">
            <FaSearch className="text-white text-lg mr-4" />
            <div className="h-8 w-px bg-white mx-2"></div>
            <div className="log-in py-2">
              <a href="/login" className="text-white hover:text-blue-500 text-lg">
                <u>Log in</u>
              </a>
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
            <a href="/books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Books</u>
            </a>
            <a href="/journals" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Journals</u>
            </a>
            <a href="/guides" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Guides</u>
            </a>
            <a href="/magazines" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Magazines</u>
            </a>
            <a href="/dictionaries" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Dictionaries</u>
            </a>
            <a href="/search-books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Search Books</u>
            </a>
            <a href="/reserves" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>Reserves</u>
            </a>
            <div className="flex items-center w-full">
              <div className="h-6 w-px bg-blue-200 mx-auto"></div>
            </div>
            <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center">
              <u>Log in</u>
            </a>
          </div>
        )}

        {/* Hero Section */}
        <div className="hero relative">
          {/* Hero Image with blur */}
          <div
            className="w-full h-60 md:h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/jornals2.jpg')",
              filter: "blur(4px)",
              WebkitFilter: "blur(4px)",
            }}
          ></div>
          {/* Overlay to darken the blurred image for better contrast */}
          <div className="absolute inset-0 w-full h-60 md:h-[400px] bg-black/20 pointer-events-none"></div>
          {/* Glassmorphism Card */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#424593] mb-2 drop-shadow">
              Total Journals
            </h2>
            <div className="text-4xl md:text-5xl font-extrabold text-[#605fe6] mb-4 drop-shadow">
              {journals.length}
            </div>
            <a
              href="#journals-list"
              className="mt-2 inline-flex items-center gap-2 bg-[#605fe6] hover:bg-[#424593] text-white px-6 py-2 rounded-lg font-semibold text-lg shadow transition"
            >
              <FaSearch className="inline-block" />
              Browse Collection
            </a>
          </div>
        </div>

        {/* Journals List Section */}
        <div id="journals-list" className="content px-4 md:px-0 pt-[20px]">
          <h2 className="text-2xl md:text-[50px] text-center mt-8 mb-4">
            <b>
              <span style={{ color: "#605fe6", fontFamily: "caveat",}}>
                Explore Our Journal Collection
              </span>
            </b>
          </h2>
          <p className="text-center text-lg mb-8 text-gray-700">
            Access a wide range of national and international journals, e-journals, and databases for your academic and research needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {journals.map((journal, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#424593]">{journal.title}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {journal.type}
                  </span>
                  <p className="text-gray-700 mb-4">{journal.desc}</p>
                </div>
                <a
                  href={journal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block bg-[#605fe6] hover:bg-[#424593] text-white px-4 py-2 rounded font-semibold transition"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>

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
    </>
  )
}

export default Journals;