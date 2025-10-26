import { useState } from "react";

// --- Custom SVG Icons (to replace react-icons/fa) ---
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
// --- End SVG Icons ---

function Reserves() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const reserveFAQs = [
    {
      question: "How do I request reserved materials?",
      answer: "Materials are requested at the Circulation Desk. Bring the course name or instructor's name to quickly locate the item.",
      link: "#request-info",
    },
    {
      question: "Can I reserve digital materials or videos?",
      answer: "Yes! Many electronic readings and videos are linked directly through your course's learning management system (e.g., Canvas).",
      link: "#digital-access",
    },
    {
      question: "What is the typical loan period for reserves?",
      answer: "The standard loan period is 2 hours for physical books. Some instructor-specified materials may be borrowed for up to 3 days.",
      link: "#loan-period",
    },
    {
      question: "Are fines applied to overdue reserve items?",
      answer: "Yes, late return of reserve materials incurs a high hourly fine to ensure availability for all students. Please return them promptly.",
      link: "#fines",
    },
  ];

  const contacts = [
    {
      name: "abc", // Reverted
      role: "Librarian", // Reverted
      phone: "", // Removed number
      email: "xyz",
      image: "https://placehold.co/64x64/424593/ffffff?text=LS", // Placeholder Image
    },
    {
      name: "abc", // Reverted
      role: "unknown", // Reverted
      phone: "", // Removed number
      email: "xyz",
      image: "https://placehold.co/64x64/01376b/ffffff?text=RP", // Placeholder Image
    },
  ];

  const PlaceholderReserves = [
    { course: "Computer Networks", item: "Reserved Slides (3-day loan)" },
    { course: "Operating Systems", item: "E-book: Reference Copy (Digital Access)" },
    { course: "Microprocessors Lab", item: "Lab Manual (2-hour loan)" },
    { course: "Data Structures", item: "Textbook Chapter 5 (Photocopy - 2 hr)" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full shadow-lg">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/dashboard" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Search Books</u></a>
          <a href="/reserves" className="text-white font-bold text-xl transition duration-150"><u>Reserves</u></a> {/* Highlighted current page */}
        </div>
        <div className="hidden md:flex items-center ml-auto">
          <SearchIcon className="text-white text-lg mr-4 h-5 w-5" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <a href="/login" className="text-white hover:text-blue-300 text-lg transition duration-150"><u>Log in</u></a>
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
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px] shadow-lg">
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Left section (Reserves Info) */}
        <div className="flex-1 space-y-8">
          
          {/* Section 1: Search & Request */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">
              Search Course Reserves
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
              Enter a **Course Code, Course Name, or Instructor's Last Name** to find materials reserved for your class.
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="e.g., CS401, Data Structures, or Sharma"
                className="w-full p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-[#424593] focus:border-transparent transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-[#424593] text-white px-4 py-3 rounded-r-md hover:bg-[#01376b] transition duration-150 flex items-center"
                onClick={() => console.log("Searching for:", searchTerm)}
                aria-label="Search reserves"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Section 2: View Reserve Materials (Expanded List) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">
              Currently Available Reserved Materials
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
              Reserve materials are kept separately at the circulation desk. You can borrow them for 2 hours or up to 3 days based on your course and instructor’s settings.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#e9f0fa] text-left text-[#01376b] text-sm font-semibold">
                    <th className="p-3 border-b-2 border-gray-200">Course / Instructor</th>
                    <th className="p-3 border-b-2 border-gray-200">Material</th>
                    <th className="p-3 border-b-2 border-gray-200">Loan Period</th>
                  </tr>
                </thead>
                <tbody>
                  {PlaceholderReserves.map((reserve, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 transition duration-100 text-sm text-gray-700">
                      <td className="p-3">{reserve.course}</td>
                      <td className="p-3 text-blue-700 hover:underline cursor-pointer">{reserve.item}</td>
                      <td className="p-3">{reserve.item.includes('Digital') ? 'Online' : reserve.item.includes('3-day') ? '3 Days' : '2 Hours'}</td>
                    </tr>
                  ))}
                </tbody>
              </table >
            </div>
          </div>

          {/* Section 3: Reserves FAQs (Accordion Style) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">
              Reserves FAQs
            </h2>
            <div className="space-y-3">
              {reserveFAQs.map((faq, idx) => (
                <Accordion key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Section 4: Instructors */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">Instructors: Place Materials on Reserve</h2>
            <p className="text-gray-700 text-sm">
              Faculty can submit requests for course reserves at any time. We highly recommend submitting requests at least **two weeks** before the start of the semester.
            </p>
            <ul className="list-disc pl-6 text-blue-700 mt-4 space-y-2 text-sm">
              <li><a href="#" className="underline">Online Request Form for Reserves</a></li>
              <li><a href="#" className="underline">Guide to Course Readings in Canvas Integration</a></li>
              <li><a href="#" className="underline">Reserve Policy for Faculty</a></li>
            </ul>
          </div>
        </div>

        {/* Right section (Contact) */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 sticky top-24">
            <h2 className="text-xl font-bold text-[#01376b] mb-4 border-b pb-2">Reserves Contact</h2>
            {contacts.map((person, idx) => (
              <div key={idx} className="flex items-start mb-6 border-b pb-4 last:border-b-0 last:pb-0">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 rounded-full shadow-md object-cover mr-4 flex-shrink-0"
                  // Added onerror to handle potential image loading issues gracefully
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/cccccc/333333?text=Staff"; }} 
                />
                <div>
                  <h3 className="text-[#424593] font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{person.role}</p>
                  {/* Removed phone display conditional on person.phone being an empty string */}
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="text-blue-700 text-sm hover:underline">
                      📧 {person.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion Component (Helper for FAQs) */}
      <AccordionStyles /> {/* Tailwind fix for single-file styling */}

      {/* Sticky Footer */}
      <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0 bottom-0 w-full z-50">
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

// Helper component for FAQ accordion functionality
const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-150 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-semibold text-[#01376b]">{question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 text-[#424593] ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="p-4 text-gray-700 text-sm border-t border-gray-100">{answer}</p>
      </div>
    </div>
  );
};

// Component to apply styling for Accordion smooth transition (required for single-file compilation)
const AccordionStyles = () => (
    <style jsx="true">{`
        .max-h-96 { max-height: 24rem; } /* Define max-h-96 */
        .max-h-0 { max-height: 0; }     /* Define max-h-0 */
    `}</style>
);


export default Reserves;
