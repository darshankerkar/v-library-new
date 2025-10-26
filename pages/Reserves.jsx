import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Reserves() {
  const [menuOpen, setMenuOpen] = useState(false);

  const reserveFAQs = [
    {
      question: "How do I request reserved materials?",
      link: "#",
    },
    {
      question: "Can I reserve digital materials or videos?",
      link: "#",
    },
  ];

  const contacts = [
    {
      name: "abc",
      role: "unknown",
      phone: "xxxxxx",
      email: "acb@test.com",
      image: "/abc.jpg", // Add or replace with actual images
    },
    {
      name: "def",
      role: "unknown",
      phone: "xxxxxx",
      email: "edf@test.com",
      image: "/def.jpg", // Add or replace with actual images
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/dashboard" className="text-white hover:text-blue-500 text-lg"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-500 text-lg"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 text-lg"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 text-lg"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 text-lg"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 text-lg"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-500 text-lg"><u>Search Books</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 text-lg"><u>Reserves</u></a>
        </div>
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <a href="/login" className="text-white hover:text-blue-500 text-lg"><u>Log in</u></a>
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

      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          <a href="/dashboard" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Search Books</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Reserves</u></a>
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center"><u>Log in</u></a>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-12">
        {/* Left section */}
        <div className="flex-1 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl md:text-2xl font-bold text-[#424593] mb-4">
              View Reserve Materials
            </h2>
            <p className="text-gray-700 mb-4">
              Reserve materials are kept separately at the circulation desk. You can borrow them for 2 hours or up to 3 days based on your course and instructor’s settings.
            </p>
            <ul className="list-disc pl-6 text-blue-700">
              <li><a href="#">Course: Computer Networks – Reserved Slides</a></li>
              <li><a href="#">E-book: Operating Systems (Reference Copy)</a></li>
              <li><a href="#">Lab Manual: Microprocessors Lab</a></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-bold text-[#424593] mb-3">Reserves FAQs</h2>
            <ul className="list-disc pl-6 text-blue-700 space-y-2">
              {reserveFAQs.map((faq, idx) => (
                <li key={idx}><a href={faq.link}>{faq.question}</a></li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-bold text-[#424593] mb-3">Instructors</h2>
            <p className="text-gray-700">
              See our <a href="#" className="text-blue-700 underline">guide to Course Readings in Canvas</a> for instructions on placing materials on reserve.
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-bold text-[#424593] mb-4">Contact Us</h2>
            {contacts.map((person, idx) => (
              <div key={idx} className="flex items-start mb-6">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 rounded shadow-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-[#424593] font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.role}</p>
                  <p className="text-sm text-gray-600">{person.phone}</p>
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="text-blue-700 text-sm">
                      {person.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
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
  );
}

export default Reserves;
