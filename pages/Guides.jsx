import { useState } from "react";
import { Link } from "react-router-dom";

// NOTE: External icon libraries (FaSearch, LuBookOpen, etc.) have been replaced 
// with inline SVG for guaranteed compilation in this environment.

// SVG Icons
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const BookOpenIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const SettingsIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 18"></polyline>
        <polyline points="6 12 18 12"></polyline>
    </svg>
);

const ClipboardCheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M9 14l2 2 4-4"></path>
    </svg>
);


// --- Mock Component for Guide Detail View ---
const GuideDetail = ({ selectedItem, setSelectedItem }) => {
  // Simple function to generate different content based on the category
  const getMockContent = (title) => {
    if (title.includes("How to")) {
      return (
        <p>This How-To Guide provides step-by-step instructions on **{title}**. Accessing your materials or reserving your space is quick and easy! For example, reserving a study room typically requires checking the availability calendar, selecting your time slot, and confirming with your university ID.</p>
      );
    } else if (title.includes("Writing") || title.includes("Citing") || title.includes("Review") || title.includes("Software")) {
      return (
        <p>This **Topic Guide** focuses on advanced academic skills. **{title}** covers essential structure, effective sourcing strategies, and tips for synthesizing complex information to produce high-quality scholarly work. Start by defining your scope, gathering authoritative sources, and organizing your points logically.</p>
      );
    }
    // Default content for Subject/Course guides
    return (
      <p>The **{title} Guide** is your curated starting point for research in this subject area. It includes key databases, recommended journals, and links to your required readings. Master the core concepts and find the authoritative sources needed for your assignments and projects.</p>
    );
  };

  const getIcon = (title) => {
    // Icons replaced with SVGs
    if (title.includes("How to")) return <ClipboardCheckIcon className="h-10 w-10 text-yellow-600 mr-4 stroke-2" />;
    if (title.includes("Writing") || title.includes("Citing") || title.includes("Review") || title.includes("Software")) return <BookOpenIcon className="h-10 w-10 text-yellow-600 mr-4 stroke-2" />;
    return <SettingsIcon className="h-10 w-10 text-yellow-600 mr-4 stroke-2" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-2xl border-t-4 border-[#01376b] animate-fadeIn">
      <button
        onClick={() => setSelectedItem(null)}
        className="text-blue-700 hover:text-blue-900 font-medium flex items-center mb-6 transition duration-150"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to All Guides
      </button>

      <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
        {getIcon(selectedItem)}
        <h3 className="text-3xl font-extrabold text-[#01376b]">{selectedItem}</h3>
      </div>
      
      <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
        {getMockContent(selectedItem)}
        
      </div>
    </div>
  );
};

function Guides() {
  // New state to manage the selected guide item for the detail view
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const guidesData = [
    {
      title: "Subject Guides",
      items: ["Chemistry", "Physics", "Maths"],
     
    },
    {
      title: "Course Guides",
      items: [
        "Introduction to Data Structures",
        "Engineering Thermodynamics",
        "Advanced Web Development",
      ],
     
    },
    {
      title: "Topic Guides",
      items: ["Research Paper Writing", "Citing Sources (APA/MLA)", "Literature Review Essentials", "Statistical Software (Python)"],
     
    },
    {
      title: "How-To Guides",
      items: ["How to Reserve a Study Room", "How to Access E-Journals Off-Campus", "How to Renew a Book Online"],
     
    },
  ];

  // Handler to set the selected item
  const handleItemClick = (itemTitle) => {
    setSelectedItem(itemTitle);
    // Optional: Scroll to the top when a guide is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#DFEDF5] flex flex-col">
      {/* Tailwind animation definitions (must be outside the component if using external CSS, but here for single file mandate) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      
      {/* Navbar - (Fixed FaSearch to SearchIcon) */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <Link to="/" aria-label="Go to home"><img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" /></Link>
        </div>
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/dashboard" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Journals</u></a>
          <a href="/guides" className="text-white text-xl transition duration-150"><u>Guides</u></a> {/* Highlighted current page */}
          <a href="/magazines" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Search Books</u></a>
          <a href="/reserves" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Reserves</u></a>
        </div>
        <div className="hidden md:flex items-center ml-auto">
          <SearchIcon className="text-white text-lg mr-4 h-5 w-5" /> {/* Use SVG icon */}
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            <a href="/login" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Log in</u></a>
          </div>
        </div>
        <button
          className="flex flex-col justify-center items-center md:hidden ml-auto h-10 w-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu - (Retained) */}
      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          {/* ... mobile links ... */}
          <a href="/dashboard" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Search Books</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Reserves</u></a>
          <div className="flex items-center w-full">
            <div className="h-6 w-px bg-blue-200 mx-auto"></div>
          </div>
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center"><u>Log in</u></a>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-[#e9f0fa] px-4 md:px-12 py-12 pt-[30px] flex-1">
        <h2 className="text-2xl md:text-[40px] text-center font-bold mb-6 pb-[22px]" style={{color:"#605fe6", fontFamily:"Inter"}}>
          <b>Check Out Our Library Guides</b>
        </h2>
        
        {/* CONDITIONAL RENDERING */}
        {selectedItem ? (
          // 1. Show Guide Detail View
          <GuideDetail selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        ) : (
          // 2. Show the Main Grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto animate-fadeIn">
            {guidesData.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 border-2 border-gray-100">
                <div className="bg-[#01376b] rounded-t-xl text-white text-lg font-semibold px-5 py-3 flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 shadow-md"></div>
                  {guide.title}
                </div>
                <div className="p-5 space-y-2 text-[#003366]">
                  <ul className="list-none space-y-3">
                    {guide.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-[#0366d6] hover:text-[#0056b3] hover:underline cursor-pointer flex items-center transition duration-150 ease-in-out font-medium"
                        onClick={() => handleItemClick(item)} // *** The new simple functionality ***
                      >
                        <span className="mr-2 text-sm">►</span> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="text-blue-700 font-semibold hover:underline inline-block mt-4 text-sm"
                  >
                    {guide.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Footer - (Retained) */}
      <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0 bottom-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and Subscribe */}
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-8 md:mb-0">
            <div className="flex flex-col sm:flex-row items-center md:items-start mb-6">
              <Link to="/" aria-label="Go to home">
                <img
                  src="/Logo-VIT.png"
                  alt="VIT Logo"
                  className="h-16 sm:h-20 mr-0 sm:mr-3 mb-2 sm:mb-0"
                />
              </Link>
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
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-r-md font-semibold transition duration-150"
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
              <li>• <a href="https://vit.edu.in/rnd/  " className="hover:underline hover:text-blue-200">R&amp;D</a></li>
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

export default Guides;
