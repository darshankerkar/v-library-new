import React from "react";
import { auth, provider } from "../src/firebaseConfig"; // Make sure the path is correct
import { signInWithPopup } from "firebase/auth";

function Login() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
      // Optional: Redirect to dashboard or handle user data
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-200 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        <div className="hidden md:flex flex-1 items-center gap-x-8 ">
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
            <a href="#" className="text-white hover:text-blue-500 text-lg "><u>Log in</u></a>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center flex-grow py-10">
        <div className="bg-white/70 backdrop-blur-md shadow-lg border border-gray-300 w-full max-w-md p-8 rounded-xl font-serif">
          <h2 className="text-3xl text-center font-bold text-red-600 mb-6 pb-3.5" style={{color:"red"}}>Log In</h2>

          <form>
            <div className="mb-3">
              <label className="block text-md font-semibold mb-1">Your College Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-md font-semibold mb-1">Your Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="text-right mb-3">
              <a href="#" className="text-red-600 hover:underline text-sm">Forgot Password</a>
            </div>

            {/* Google Login Button */}
            <div className="text-center mb-4 ml-18">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="bg-white text-gray-700 border border-gray-400 px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:shadow-md transition"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="font-medium">Continue with Google</span>
              </button>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-2 rounded-full transition-all duration-300"
                onClick={()=>alert("Login Successful!!")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#424593] text-white pt-8 pb-4 px-4 md:px-0 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
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

          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2 text-base">
              <li>Vidyalankar Institute of Technology,<br />Wadala(E), Mumbai-400 037</li>
              <li>+91 22 2416 11 40</li>
              <li>Write to Us</li>
              <li>Get Directions</li>
            </ul>
          </div>

          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Academics</h3>
            <ul className="space-y-2 text-base">
              <li>• Information Technology</li>
              <li>• Computer Engineering</li>
              <li>• Electronics & CS</li>
              <li>• Electronics & Telecom</li>
              <li>• Biomedical Engineering</li>
              <li>• Management Studies</li>
            </ul>
          </div>

          <div className="md:w-1/4">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Website</h3>
            <ul className="space-y-2 text-base">
              <li>• Home</li>
              <li>• Who We Are</li>
              <li>• Contact Us</li>
              <li>• Terms & Conditions</li>
              <li>• Privacy Policy</li>
              <li>• R&D</li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-blue-200" />
        <div className="text-center text-base">© 2025 All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default Login;
