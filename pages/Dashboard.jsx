import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaPlusCircle, FaBell, FaBookOpen, FaExclamationCircle, FaHourglassHalf } from "react-icons/fa";

// Simple toast notification component (Copied from SearchBooks logic)
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

// --- Helper Functions to match SearchBooks style ---
const calculateDaysLeft = (dueDateString) => {
    const today = new Date();
    const dueDate = new Date(dueDateString);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// --- Component for Dashboard Statistics Cards ---
const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass, hoverColorClass }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-xl border-b-4 ${colorClass} transition-all hover:shadow-2xl hover:scale-[1.01] transform`}>
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
            <Icon className={`text-4xl ${colorClass} opacity-70`} />
        </div>
        <p className={`text-5xl font-extrabold mt-2 ${colorClass}`}>{value}</p>
        <div className={`mt-3 text-sm font-medium ${bgColorClass} text-white px-3 py-1 rounded-full inline-block`}>
            {title === "Overdue" ? "Immediate Action" : "Check Status"}
        </div>
    </div>
);

function Dashboard() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    
    // Derived stats for the cards
    const totalBorrowed = borrowedBooks.length;
    const overdueCount = borrowedBooks.filter(book => calculateDaysLeft(book.dueDate) < 0).length;
    const dueSoonCount = borrowedBooks.filter(book => {
        const days = calculateDaysLeft(book.dueDate);
        return days >= 0 && days <= 7;
    }).length;


    // Load borrowed books from localStorage
    useEffect(() => {
        const borrowed = JSON.parse(localStorage.getItem("borrowed") || "[]");
        setBorrowedBooks(borrowed);
        
        // Check if any books are due soon (within 7 days) or overdue
        const hasUrgent = borrowed.some((book) => {
            const daysLeft = calculateDaysLeft(book.dueDate);
            return daysLeft <= 7;
        });
        
        if (hasUrgent && borrowed.length > 0) {
            setShowNotification(true);
        }
    }, []);

    const handleReturn = (bookIndex) => {
        const book = borrowedBooks[bookIndex];
        
        // Remove from localStorage
        const updated = borrowedBooks.filter((_, index) => index !== bookIndex);
        localStorage.setItem("borrowed", JSON.stringify(updated));
        
        // Update state
        setBorrowedBooks(updated);
        
        // Show success message (using the simulated toast)
        showToast(`"${book.title}" has been successfully returned!`, "success");
        
        // Re-check and update notification state
        const today = new Date();
        const hasUrgent = updated.some((b) => {
            const daysLeft = calculateDaysLeft(b.dueDate);
            return daysLeft <= 7;
        });
        setShowNotification(hasUrgent && updated.length > 0);
    };

    return (
        <div className="outer-div bg-[#DFEDF5] min-h-screen flex flex-col font-inter">
            {/* Sticky Navbar (Reusing style from SearchBooks) */}
            <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
                <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
                    <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
                </div>
                {/* Desktop Menu */}
                <div className="hidden md:flex flex-1 items-center gap-x-8">
                    {/* Highlight Dashboard as active */}
                    <a href="/dashboard" className="text-blue-200 hover:text-white text-lg font-bold">
                        <u>Dashboard</u>
                    </a>
                    {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Search Books", "Reserves"].map((item) => (
                        <a 
                            key={item} 
                            href={`/${item.toLowerCase().replace(' ', '-')}`} 
                            className={`text-white hover:text-blue-200 text-lg ${item === "Search Books" ? 'underline' : ''}`}
                        >
                            <u>{item}</u>
                        </a>
                    ))}
                </div>
                {/* Desktop Right */}
                <div className="hidden md:flex items-center ml-auto">
                    <button onClick={() => navigate("/search-books")} aria-label="Search" className="text-white text-lg mr-4 hover:text-blue-200">
                        <FaSearch />
                    </button>
                    <div className="h-8 w-px bg-white mx-2"></div>
                    <a href="/login" className="text-white hover:text-blue-200 text-lg">
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
                <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40">
                    <a href="/dashboard" className="text-blue-200 hover:text-white py-3 text-lg w-full text-center border-b border-blue-200 font-bold">
                        <u>Dashboard</u>
                    </a>
                    {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Search Books", "Reserves"].map((item) => (
                        <a key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-blue-200 py-3 text-lg w-full text-center border-b border-blue-200">
                            <u>{item}</u>
                        </a>
                    ))}
                    <a href="/login" className="text-white hover:text-blue-200 py-3 text-lg w-full text-center">
                        <u>Log in</u>
                    </a>
                </div>
            )}

            {/* Notification Banner */}
            {showNotification && totalBorrowed > 0 && (
                <div className="bg-red-500 text-white p-4 mx-auto mt-6 rounded-xl shadow-lg max-w-7xl w-[calc(100%-3rem)] md:w-full flex items-center justify-between transition-all duration-500">
                    <div className="flex items-center gap-3">
                        <FaBell className="text-2xl animate-pulse" />
                        <span className="font-semibold text-lg">
                            URGENT: {overdueCount > 0 ? `${overdueCount} book(s) overdue!` : ''} {overdueCount > 0 && dueSoonCount > 0 ? ' and ' : ''}
                            {dueSoonCount > 0 ? `${dueSoonCount} book(s) due soon!` : ''} Please check the list below.
                        </span>
                    </div>
                    <button
                        onClick={() => setShowNotification(false)}
                        className="text-white hover:text-gray-200 font-bold text-2xl p-1"
                        aria-label="Close notification"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
                {/* Dashboard Header matching SearchBooks style */}
                <h1
                    className="text-4xl md:text-7xl font-pacifico my-6 pl-4 md:pl-0 pt-4"
                    style={{ fontFamily: "Caveat", color: "#605fe6" }}
                >
                    User Dashboard
                </h1>
                <p className="text-xl text-gray-700 mb-8 pl-4 md:pl-0">Quick summary and current borrowings</p>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard 
                        title="Borrowed Books" 
                        value={totalBorrowed} 
                        icon={FaBookOpen} 
                        colorClass="text-blue-600"
                        bgColorClass="bg-blue-600"
                    />
                    <StatCard 
                        title="Due Soon (7 Days)" 
                        value={dueSoonCount} 
                        icon={FaHourglassHalf} 
                        colorClass="text-yellow-600"
                        bgColorClass="bg-yellow-600"
                    />
                    <StatCard 
                        title="Overdue" 
                        value={overdueCount} 
                        icon={FaExclamationCircle} 
                        colorClass="text-red-600"
                        bgColorClass="bg-red-600"
                    />
                </div>

                {/* Books Borrowed Section (Redesigned Table) */}
                <section className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Current Borrowings ({totalBorrowed})</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-50 text-gray-700 text-sm">
                                <tr>
                                    <th className="px-4 py-3">Book Name</th>
                                    <th className="px-4 py-3">Author</th>
                                    <th className="px-4 py-3">Borrow Date</th>
                                    <th className="px-4 py-3">Due Date</th>
                                    <th className="px-4 py-3">Duration</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {totalBorrowed === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-10 text-center text-gray-500 text-lg">
                                            You haven't borrowed any books yet.
                                            <button
                                                onClick={() => navigate("/search-books")}
                                                className="ml-3 text-blue-600 hover:text-blue-800 font-semibold underline"
                                            >
                                                Start borrowing here!
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    borrowedBooks.map((book, index) => {
                                        const daysLeft = calculateDaysLeft(book.dueDate);
                                        const isOverdue = daysLeft < 0;
                                        const isDueSoon = daysLeft <= 7 && daysLeft >= 0;
                                        
                                        let statusText = "Active";
                                        let statusClass = "bg-green-100 text-green-700";

                                        if (isOverdue) {
                                            statusText = `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}`;
                                            statusClass = "bg-red-100 text-red-700";
                                        } else if (isDueSoon) {
                                            statusText = `Due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`;
                                            statusClass = "bg-yellow-100 text-yellow-700";
                                        }

                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{book.title}</td>
                                                <td className="px-4 py-3 text-gray-700">{book.author}</td>
                                                <td className="px-4 py-3 text-gray-700">{book.borrowDate}</td>
                                                <td className="px-4 py-3 font-medium">
                                                    {book.dueDate}
                                                </td>
                                                <td className="px-4 py-3">{book.days} Days</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                                                        {statusText}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleReturn(index)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold shadow-md"
                                                        aria-label={`Return ${book.title}`}
                                                    >
                                                        Return
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Action Section and Reminder */}
                <section className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Action Button */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <button
                            className="w-full bg-[#5b33eb] hover:bg-[#4829c5] text-white font-semibold px-6 py-4 rounded-xl text-lg flex items-center justify-center gap-3 shadow-lg transition-colors"
                            onClick={() => navigate("/search-books")}
                        >
                            <FaPlusCircle className="text-xl" /> Borrow a New Book
                        </button>
                    </div>
                    
                    {/* Reminder Box */}
                    <div className="w-full md:w-2/3 bg-white border-l-4 border-blue-600 p-6 rounded-xl shadow-lg">
                        <p className="text-lg text-gray-800 font-semibold mb-2">
                            <span className="text-blue-600 text-xl mr-2">i</span> Library Notice
                        </p>
                        <p className="text-gray-600">
                            Please use the library system responsibly. Returning books on time is essential to help other students and avoid potential penalties.
                        </p>
                        {overdueCount > 0 && (
                            <p className="text-red-600 font-bold mt-3 flex items-center gap-2">
                                <FaExclamationCircle /> You currently have {overdueCount} book(s) overdue!
                            </p>
                        )}
                        {dueSoonCount > 0 && overdueCount === 0 && (
                            <p className="text-yellow-600 font-bold mt-3 flex items-center gap-2">
                                <FaHourglassHalf /> Don't forget, {dueSoonCount} book(s) are due soon!
                            </p>
                        )}
                    </div>
                </section>

            </main>

            {/* Footer (Reused from SearchBooks) */}
            <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0 w-full z-50 mt-12">
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

export default Dashboard;
