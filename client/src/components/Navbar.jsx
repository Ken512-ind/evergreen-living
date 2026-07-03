import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  logout,
  getCurrentUser,
  isAuthenticated,
} from "../services/authService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const checkAuthStatus = () => {
    const loggedInUser = getCurrentUser();

    if (loggedInUser && isAuthenticated()) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    logout();

    setIsLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);

    navigate("/");
    window.location.reload();
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl md:text-2xl font-bold text-green-600 hover:text-green-700 transition"
        >
          Evergreen Living
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Home
          </Link>

          <Link
            to="/indoor"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Indoor Plants
          </Link>

          <Link
            to="/herbal"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Herbal Plants
          </Link>

          {/* Login / Logout */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">

              <span className="text-gray-700">
                Hi,{" "}
                <span className="font-semibold text-green-700">
                  {user?.name}
                </span>
              </span>

              {user?.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600 font-medium transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <Link
                to="/register"
                className="text-gray-700 hover:text-green-600 font-medium transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
              >
                Login
              </Link>

            </div>
          )}

        </div>

        {/* Hamburger button - mobile only */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-1">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium px-3 py-3 rounded-lg transition"
          >
            Home
          </Link>

          <Link
            to="/indoor"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium px-3 py-3 rounded-lg transition"
          >
            Indoor Plants
          </Link>

          <Link
            to="/herbal"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium px-3 py-3 rounded-lg transition"
          >
            Herbal Plants
          </Link>

          <div className="border-t my-2" />

          {isLoggedIn ? (
            <>
              <div className="px-3 py-2 text-gray-700">
                Hi,{" "}
                <span className="font-semibold text-green-700">
                  {user?.name}
                </span>
              </div>

              {user?.role === "admin" && (
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium px-3 py-3 rounded-lg transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-3 rounded-lg transition text-left mt-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium px-3 py-3 rounded-lg transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-lg transition text-center"
              >
                Login
              </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;