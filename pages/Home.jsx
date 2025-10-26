import { useState } from "react";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import Calender from "./Calender"; // adjust path if needed
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
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
            <a
              href="/journals"
              className="text-white hover:text-blue-500 text-lg"
            >
              <u>Journals</u>
            </a>
            <a
              href="/guides"
              className="text-white hover:text-blue-500 text-lg"
            >
              <u>Guides</u>
            </a>
            <a
              href="/magazines"
              className="text-white hover:text-blue-500 text-lg"
            >
              <u>Magazines</u>
            </a>
            <a
              href="/dictionaries"
              className="text-white hover:text-blue-500 text-lg"
            >
              <u>Dictionaries</u>
            </a>
            <a
              href="/search-books"
              className="text-white hover:text-blue-500 text-lg"
            >
              <u>Search Books</u>
            </a>
            <a
              href="/reserves"
              className="text-white hover:text-blue-500 text-lg"
            >
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
            <a
              href="/books"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Books</u>
            </a>
            <a
              href="/journals"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Journals</u>
            </a>
            <a
              href="/guides"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Guides</u>
            </a>
            <a
              href="/magazines"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Magazines</u>
            </a>
            <a
              href="/dictionaries"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Dictionaries</u>
            </a>
            <a
              href="/search-books"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Search Books</u>
            </a>
            <a
              href="/reserves"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"
            >
              <u>Reserves</u>
            </a>
            <div className="flex items-center w-full">
              <div className="h-6 w-px bg-blue-200 mx-auto"></div>
            </div>
            <a
              href="/login"
              className="text-white hover:text-blue-500 py-2 text-lg w-full text-center"
            >
              <u>Log in</u>
            </a>
          </div>
        )}

        {/* Calendar/Date Section */}
        <div className="w-full bg-[#f5f8fa] flex items-center justify-center py-2">
          <span className="font-semibold text-lg text-[#424593] mr-2">
            {dateString} | Closed
          </span>
          <button
            className="ml-1"
            onClick={() => setShowCal(true)}
            aria-label="Show Calendar"
          >
            <FaRegCalendarAlt className="text-blue-600 text-xl" />
          </button>
        </div>

        {/* Calendar Modal */}
        {showCal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full mx-2">
              <button
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500"
                onClick={() => setShowCal(false)}
                aria-label="Close Calendar"
              >
                &times;
              </button>
              <Calender />
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="hero">
          <div
            className="w-full h-60 md:h-[650px] bg-cover bg-center relative"
            style={{ backgroundImage: "url('/library.jpg')" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white font-bold text-3xl md:text-[60px] underline decoration-yellow-400 underline-offset-8 text-center">
                Library Portal
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="content px-4 md:px-0">
          <h1 className="text-2xl md:text-[45px] text-center mt-4 md:mt-[60px]">
            <b>
              <span style={{ color: "#605fe6" }}>CLICK, BORROW, DONE </span>–
              YOUR DIGITAL LIBRARY AT VIT
            </b>
          </h1>
          <div className="content1 flex flex-col md:flex-row items-center md:items-start justify-center">
            <div className="w-full md:max-w-3xl mt-6 md:mt-[40px]">
              <video
                src="video-1.mp4"
                autoPlay
                muted
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
            <div className="w-full md:w-[400px] mt-6 md:mt-[40px] md:ml-[50px] text-justify text-base md:text-lg mb-[190px] flex flex-col items-center md:items-start"> {/* Added flex-col items-center for mobile centering */}
              <p>
                Welcome to the VIT Mumbai Digital Library Portal - a smarter,
                faster way to access your campus library. Students can easily
                browse available books, borrow them online, and keep track of
                due dates and returns, all in one place. With real-time updates
                and fine tracking, you'll never miss a deadline again.
                Librarians get a powerful dashboard to manage inventory, approve
                returns, and handle student requests efficiently. Built for a
                seamless experience, the portal brings the entire library to
                your fingertips. Say goodbye to queues and paperwork - your
                digital library starts here.
              </p>
              <button
                className="btn1 bg-amber-500 text-amber-50 rounded-[8px] mt-6 px-6 py-2 w-98" // Adjusted padding for better look, removed fixed ml-18 pl-23 pr-23 pt-2 pb-2
                onClick={() => navigate("/select")} // Replace '/select' with your route to SelectPage
                style={{ borderRadius: "8px" }} // Keeping inline style for border-radius as it's already there
              >
                <b>Get Started</b>
              </button>
            </div>
          </div>
          <div className="content2">
            <h1 className="text-2xl md:text-[40px] text-center mt-4 md:mt-[60px]">
              <b>
                <u>Learning Resources (as on 05.07.2025)</u>
              </b>
            </h1>
            <div className="overflow-x-auto mt-[45px] ml-[30px] mr-[30px]">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th
                      className="bg-[#0a3977] text-white text-left px-4 py-2 text-lg font-semibold w-2/3"
                      colSpan={2}
                      style={{ width: "86%" }} // Reduce width of "Library Resources"
                    >
                      <span className="inline-flex items-center">
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20h9"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z"
                          />
                        </svg>
                        Library Resources
                      </span>
                    </th>
                    <th
                      className="bg-[#0a3977] text-white px-4 py-2 text-lg font-semibold text-center w-1/3"
                      style={{ width: "34%" }} // Increase width of "VIT Mumbai"
                    >
                      VIT Mumbai
                    </th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  <tr className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      Total Number of Books
                    </td>
                    <td className="px-4 py-2 text-center">50,826</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      Total Number of Volumes
                    </td>
                    <td className="px-4 py-2 text-center">10,350</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      Print Journals / Magazines
                    </td>
                    <td className="px-4 py-2 text-center">402</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      National
                    </td>
                    <td className="px-4 py-2 text-center">300</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      International
                    </td>
                    <td className="px-4 py-2 text-center">89</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-bold" colSpan={3}>
                      Online databases/E-Journals :{" "}
                      <span className="font-normal">
                        (On and Off Campus access facility)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-justify" colSpan={2}>
                      Access a wide range of reputed national and international
                      scholarly resources, including: ProQuest ABI Inform, ACM
                      Digital Library, ACS Journals, ASCE and ASME Digital
                      Libraries, ASTM Standards, Bentham Science, British
                      Standards Online, and CMIE databases (Prowess IQ, Economic
                      Outlook, Industry Outlook). The library also provides
                      access to leading platforms such as EBSCO Business Source,
                      Electrochemical Society (ECS), Emerald Insights, Emerging
                      Market Case Studies (EEMCS), Harvard Business Review
                      Cases, IEEE Xplore, Indian Standards, Indiastat, IOP
                      Publishing, and MathSciNet. Students and researchers can
                      also explore Springer Journals, Nature Publishing Group,
                      Scientific American, Royal Society of Chemistry (RSC),
                      ProQuest e-Library, SAE Mobilus, SAGE Publications,
                      ScienceDirect, Scopus, SciFinder Scholar, Wiley Online
                      Library, Web of Science, and the ProQuest Dissertation &
                      Theses Global database (Science, Engineering, Humanities,
                      and Social Sciences).
                    </td>
                    <td className="px-4 py-2 text-center align-top">16,829</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      E-Book – (On and Off Campus access)
                    </td>
                    <td className="px-4 py-2 text-center">67,788</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="content3">
            <div className="wrapper flex flex-col md:flex-row md:pr-25 items-center md:items-start justify-center"> {/* Added flex-col and items-center for mobile */}
              <div className="text3">
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 max-w-[550px] mt-10 md:ml-[100px] mx-auto md:mx-0">
                  <h1 className="text-2xl md:text-[40px] font-bold mb-6 text-left">
                    <u>Vibrant Features</u>
                  </h1>
                  <ul className="list-none space-y-2 text-gray-700">
                    <li>
                      ➤ Highly qualified & efficient librarians and support
                      staff
                    </li>
                    <li>
                      ➤ Standard textbooks from reputed national & international
                      publishers
                    </li>
                    <li>
                      ➤ Regular updates to textbooks, journals, and e-resources
                    </li>
                    <li>
                      ➤ Scanner & printing facilities available for students
                    </li>
                    <li>
                      ➤ Digital access to e-journals, databases, and online
                      study materials
                    </li>
                    <li>
                      ➤ RFID/barcode-enabled automated book borrowing and return
                      system
                    </li>
                    <li>
                      ➤ Spacious, quiet reading halls with extended working
                      hours
                    </li>
                    <li>
                      ➤ Access to educational platforms like NPTEL, SWAYAM &
                      NDLI
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pictures3 flex flex-col md:flex-row md:ml-[30px] mt-8 md:mt-10 items-center"> {/* Added flex-col and items-center for mobile layout */}
                {/* Display only one image on phones, hide others */}
                <img
                  src="readingv.jpg" // Keeping readingv.jpg for mobile
                  className="w-[300px] h-[350px] md:w-[400px] md:h-[520px] mb-4 md:mb-0 md:ml-[20px] object-cover block md:hidden"
                  alt="Reading"
                />
                <div className="hidden md:flex hor-images md:flex-col"> {/* Hidden on mobile, flex-col on desktop */}
                  <img
                    src="reading1.jpg"
                    style={{
                      width: "400px",
                      height: "250px",
                      marginBottom: "20px",
                    }}
                    alt="Reading"
                  />
                  <img
                    src="reading2.jpg"
                    style={{ width: "400px", height: "250px" }}
                    alt="Reading"
                  />
                </div>
                 {/* Display readingv.jpg for larger screens */}
                 <img
                  src="readingv.jpg"
                  className="hidden md:block" // Hidden on mobile, block on desktop
                  style={{
                    width: "400px",
                    height: "520px",
                    marginLeft: "20px",
                  }}
                  alt="Reading"
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          {/* Footer */}
          <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0">
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
                <h3 className="font-bold text-lg sm:text-xl mb-4">
                  Contact Us
                </h3>
                <ul className="space-y-2 text-base">
                  <li>
                    <span className="mr-2">
                      <i class="fa-solid fa-graduation-cap"></i>
                    </span>
                    Vidyalankar Institute of Technology,
                    <br />
                    Vidyalankar College Marg, Wadala(E),
                    <br />
                    Mumbai-400 037
                  </li>
                  <li>
                    <span className="mr-2">
                      <i class="fa-solid fa-phone"></i>
                    </span>
                    +91 22 2416 11 40
                  </li>
                  <li>
                    <span className="mr-2">
                      <i class="fa-solid fa-envelope"></i>
                    </span>
                    Write to Us
                  </li>
                  <li>
                    <span className="mr-2">
                      <i class="fa-solid fa-location-dot"></i>
                    </span>
                    Get Directions
                  </li>
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
            <div className="text-center text-base">
              © 2025 All Rights Reserved.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
