import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
import NotificationBell from "./NotificationBell"; // Import NotificationBell
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Get user data safely
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  })();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardNavigation = () => {
    if (user?.role === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 fixed w-full top-0 left-0 z-10 p-4 px-6 md:px-36 shadow-md">
      <div className="flex items-center justify-between ">
        <div onClick={() => navigate('/')} className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
          Codetec
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          {/* Notification Bell */}
          {user && <NotificationBell userId={user._id} />}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="flex items-center gap-3 dark:text-white" aria-expanded={isDropdownOpen}>
                <p>Welcome, {user?.name}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg rounded-md">
                  <button onClick={handleDashboardNavigation} className="block w-full text-left px-4 py-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                    Edit Profile
                  </button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="px-4 py-2 border rounded-md text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-transparent hover:bg-blue-100 dark:hover:bg-blue-800">
                Sign In
              </button>
              <button onClick={() => navigate('/register')} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Register
              </button>
            </>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
