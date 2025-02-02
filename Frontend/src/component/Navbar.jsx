import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

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
    await api.post("/user/logout");
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
    }else if(user?.role === "admin"){
      navigate("/admin")
    } 
    else {
      navigate("/user/dashboard");
    }
  };
  

  return (
    <nav className="bg-white dark:bg-gray-800 fixed w-full top-0 left-0 z-10 p-4 px-6 md:px-36 shadow-md">
      <div className="flex items-center justify-between max-w-7xl">
        <div onClick={() => navigate('/')} className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
          Codetec
        </div>

        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <span className="text-2xl">&times;</span> : <span className="text-2xl">&#9776;</span>}
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
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
                  <button onClick={handleDashboardNavigation} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
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

      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <button onClick={toggleMenu} className="absolute top-4 right-4" aria-label="Close menu">&times;</button>
        <div className="mt-16 space-y-4 px-4">
          {user? (
            <>
              <button onClick={handleDashboardNavigation} className="block w-full text-left px-4 py-2">
                Dashboard
              </button>
              <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="block w-full text-left px-4 py-2 text-blue-600 border-b">
                Sign In
              </button>
              <button onClick={() => navigate('/register')} className="block w-full text-left px-4 py-2 text-white bg-blue-500 rounded-md">
                Register
              </button>
            </>
          )}
          <div className="mt-4">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
