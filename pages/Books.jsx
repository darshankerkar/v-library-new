import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Books() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of books visible at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const books = [
    "/Book1.jpeg",
    "/Book2.jpg",
    "/Book3.jpg",
    "/Book4.jpg",
    "/Book5.jpg",
    "/Book6.jpg",
    "/Book7.jpeg",
    
  ];

  return (
    <div className="outer-div bg-[#DFEDF5] min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8 ">
          <a
            href="/books"
            className="text-white hover:text-blue-500 text-lg"
          >
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
            href="/reserves"
            className="text-white hover:text-blue-500 text-lg"
          >
            <u>Reserves</u>
          </a>
        </div>
        {/* Desktop Search & Login */}
        <div className="hidden md:flex items-center ml-auto">
          <i className="fa-solid fa-magnifying-glass text-white text-lg mr-4"></i>
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            <a
              href="/login"
              className="text-white hover:text-blue-500 text-lg"
            >
              <u>Log in</u>
            </a>
          </div>
        </div>
        {/* Hamburger Icon (mobile only) */}
        {/* ...your hamburger code here if needed... */}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1
          className="text-5xl md:text-7xl font-pacifico my-6 pl-[75px] pt-[30px]"
          style={{ fontFamily: "Caveat", color: "#605fe6"}}
        >
          Books
        </h1>
        <div className="bg-white rounded-2xl shadow p-8 max-w-[90vw] mx-auto">
          <Slider {...settings}>
            {books.map((src, idx) => (
              <div key={idx} className="flex justify-center items-center">
                <img
                  src={src}
                  alt={`Book ${idx + 1}`}
                  className="h-[250px] w-auto object-contain rounded shadow"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Search Box */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center">
          <div className="w-full md:max-w-2xl">
            <div
              className="bg-white rounded-2xl shadow border border-gray-200 flex flex-col justify-center"
              style={{ minHeight: "320px" }} // <-- Increase the height here as needed
            >
              {/* Heading: reduce height/padding */}
              <div className="flex items-center px-6 py-2 bg-[#00396b] rounded-t-2xl min-h-0">
                <span className="w-4 h-4 bg-yellow-400 rounded mr-3"></span>
                <h2
                  className="text-white text-3xl font-mono font-semibold"
                  style={{ fontFamily: "Caveat" }}
                >
                  Search
                </h2>
              </div>
              {/* Increase search box height */}
              <h3 style={{fontFamily:"Caveat",marginLeft:"80px",marginTop:"75px"}} >Find What You’re Looking For :</h3>
              <div className="flex-1 flex flex-col justify-center p-8 pt-[0px]">
                <div
                  className="flex items-center bg-[#f1f7fd] rounded-full border border-gray-300 px-6"
                  style={{ height: "54px" }}
                >
                  <input
                    type="text"
                    placeholder="...for books and ebooks"
                    className="bg-transparent flex-1 outline-none text-lg"
                    style={{ height: "100%" }}
                  />
                  <i className="fa-solid fa-magnifying-glass text-gray-500 text-xl ml-2"></i>
                </div>
              </div>
            </div>
          </div>
          {/* Course Materials */}
          <div className="w-full md:max-w-sm flex flex-col justify-stretch">
            <div className="bg-white rounded-2xl shadow border border-gray-200 h-full flex flex-col">
              {/* Heading: reduce height/padding */}
              <div className="flex items-center px-6 py-2 bg-[#00396b] rounded-t-2xl min-h-0">
                <span className="w-4 h-4 bg-yellow-400 rounded mr-3"></span>
                <h2
                  className="text-white text-2xl font-mono font-semibold"
                  style={{ fontFamily: "Caveat" }}
                >
                  Course Materials
                </h2>
              </div>
              <div className="p-6 text-gray-800 text-base flex-1">
                Looking for your textbook or other course materials? Try our{" "}
                <a href="#" className="text-blue-600 underline">
                  reserves search
                </a>{" "}
                or your course’s Canvas site.
                <br />
                <br />
                If we don’t have your textbook, you can{" "}
                <a href="#" className="text-blue-600 underline">
                  request that we purchase it.
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* New Materials */}
        <div className="mt-12 w-full md:max-w-[1100px] mx-auto mb-[30px]">
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            {/* Heading: reduce height/padding */}
            <div className="flex items-center px-6 py-2 bg-[#00396b] rounded-t-2xl min-h-0">
              <span className="w-4 h-4 bg-yellow-400 rounded mr-3"></span>
              <h2
                className="text-white text-3xl font-mono font-semibold"
                style={{ fontFamily: "Caveat" }}
              >
                New Materials
              </h2>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-serif mb-4">New Titles</h3>
              <ul className="list-disc list-inside text-lg mb-6">
                <li>
                  <a href="#" className="text-blue-600 underline">
                    All new titles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    New titles by subject
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    New ebooks
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    New popular reading
                  </a>
                </li>
              </ul>
              <h3 className="text-2xl font-serif mb-4">Popular Reading</h3>
              <ul className="list-disc list-inside text-lg">
                <li>
                  <a href="#" className="text-blue-600 underline">
                    All popular reading
                  </a>
                </li>
              </ul>
            </div>
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

export default Books;
