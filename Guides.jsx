import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Guides() {
  const [menuOpen, setMenuOpen] = useState(false);
  const guidesData = [
    {
      title: "Subject Guides",
      items: ["Chemistry", "Physics", "Maths"],
      linkText: "See all subject guides",
    },
    {
      title: "Course Guides",
      items: [
        "abc",
        "abc",
        "abc",
      ],
      linkText: "See all course guides",
    },
    {
      title: "Topic Guides",
      items: ["abc", "abc", "abc","abc"],
      linkText: "See all topic guides",
    },
    {
      title: "How-To Guides",
      items: ["abc", "abc", "abc"],
      linkText: "See all how-to guides",
    },
  ];

  return (
    <div className="min-h-screen bg-[#DFEDF5] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/books" className="text-white hover:text-blue-500 text-lg"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 text-lg"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 text-lg"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 text-lg"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 text-lg"><u>Dictionaries</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 text-lg"><u>Reserves</u></a>
        </div>
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            <a href="/login" className="text-white hover:text-blue-500 text-lg"><u>Log in</u></a>
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          <a href="/books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dictionaries</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Reserves</u></a>
          <div className="flex items-center w-full">
            <div className="h-6 w-px bg-blue-200 mx-auto"></div>
          </div>
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center"><u>Log in</u></a>
        </div>
      )}

      <div className="bg-[#e9f0fa] px-4 md:px-12 py-12 pt-[30px]">
      <h2 className="text-2xl md:text-[40px] text-center font-bold mb-6 pb-[22px]" style={{color:"#605fe6", fontFamily:"cavaet"}}>
        <b>Check Out Our Library Guides</b>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {guidesData.map((guide, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="bg-[#01376b] rounded-t-xl text-white text-lg font-semibold px-4 py-2 flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              {guide.title}
            </div>
            <div className="p-4 space-y-2 text-[#003366]">
              <ul className="list-disc list-inside">
                {guide.items.map((item, i) => (
                  <li key={i} className="text-[#0366d6] hover:underline cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="text-blue-700 font-semibold hover:underline inline-block mt-4"
              >
                {guide.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Footer */}
      <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and Subscribe */}
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-8 md:mb-0">
            <div className="flex flex-col sm:flex-row items-center md:items-start mb-6">
              <img src="/Logo-VIT.png" alt="VIT Logo" className="h-16 sm:h-20 mr-0 sm:mr-3 mb-2 sm:mb-0" />
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
                <i className="fa-solid fa-graduation-cap mr-2"></i>
                Vidyalankar Institute of Technology,<br />
                Vidyalankar College Marg, Wadala(E),<br />
                Mumbai-400 037
              </li>
              <li><i className="fa-solid fa-phone mr-2"></i>+91 22 2416 11 40</li>
              <li><i className="fa-solid fa-envelope mr-2"></i>Write to Us</li>
              <li><i className="fa-solid fa-location-dot mr-2"></i>Get Directions</li>
            </ul>
          </div>

          {/* Academics */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Academics</h3>
            <ul className="space-y-2 text-base">
              <li>• Information Technology</li>
              <li>• Computer Engineering</li>
              <li>• Electronics and Computer Science</li>
              <li>• Electronics and Telecommunication Engineering</li>
              <li>• Biomedical Engineering</li>
              <li>• Management Studies</li>
            </ul>
          </div>

          {/* Website */}
          <div className="md:w-1/4">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Website</h3>
            <ul className="space-y-2 text-base">
              <li>• Home</li>
              <li>• Who We are</li>
              <li>• Contact Us</li>
              <li>• Terms & Conditions</li>
              <li>• Privacy Policy</li>
              <li>• R&amp;D</li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-blue-200" />
        <div className="text-center text-base">© 2025 All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default Guides;

