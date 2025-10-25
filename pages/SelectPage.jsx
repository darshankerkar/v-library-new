import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

function SelectPage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!role) {
      alert("Please select a role before continuing.");
      return;
    }

    // Save role (optional)
    localStorage.setItem("selectedRole", role);

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-200 flex flex-col">
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
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            <a href="#" className="text-white hover:text-blue-500 text-lg"><u>Log in</u></a>
          </div>
        </div>
      </div>

      {/* // write your code here */}
      <div className="flex justify-center items-center flex-grow py-12">
        <div className="bg-white/70 backdrop-blur-md shadow-lg border border-gray-300 w-full max-w-md p-8 rounded-xl font-serif flex flex-col items-center space-y-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-green-400 text-black font-semibold text-xl px-6 py-3 rounded-md w-full text-center cursor-pointer hover:bg-green-500"
          >
            <option value="">Select your role ▼</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleNext}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-2 rounded-full transition-all duration-300"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-red-600 text-white text-sm md:text-base text-center px-4 py-2 font-semibold">
        ⚠️ Only college-issued Outlook email IDs are allowed. <br />
        Please use your official VIT Mumbai email (e.g., <span className="font-mono">name@vit.edu.in</span>)
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

export default SelectPage;
