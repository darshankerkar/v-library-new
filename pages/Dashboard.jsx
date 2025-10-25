import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#a3f0ff] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Reserves"].map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`} className="text-white hover:text-blue-500 text-lg">
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
          {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Reserves"].map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`} className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>{item}</u>
            </a>
          ))}
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center">
            <u>Log in</u>
          </a>
        </div>
      )}

      {/* // write your code here */}
      <main className="flex-grow p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 font-serif">Welcome, [User]</h1>
        <p className="text-lg text-black mb-6 font-serif">Check Proposal History and Status</p>

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
                  <th className="border border-black px-4 py-2">Date Purchased</th>
                  <th className="border border-black px-4 py-2">Return Date</th>
                  <th className="border border-black px-4 py-2">View Details</th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder row */}
                <tr className="bg-gray-200">
                  <td className="border border-black px-4 py-2">–</td>
                  <td className="border border-black px-4 py-2">–</td>
                  <td className="border border-black px-4 py-2">–</td>
                  <td className="border border-black px-4 py-2">–</td>
                </tr>
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
            onClick={() => navigate("/books")}
          >
            Borrow a Book <FaPlusCircle />
          </button>
        </section>

        {/* Reminder */}
        <p className="text-sm text-black font-semibold mt-6 font-serif">
          <span className="text-red-600 text-lg">❗</span> Reminder: Use the library system responsibly. Return books on time and maintain proper decorum to avoid penalties.
        </p>
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
