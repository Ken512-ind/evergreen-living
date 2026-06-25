import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in when component mounts
  useEffect(() => {
    checkAuthStatus();
    
    // Listen for storage changes (login in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const checkAuthStatus = () => {
    const loggedInUser = authService.getCurrentUser();
    const token = authService.getToken();
    
    if (loggedInUser && token) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    authService.logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    
    // Auto refresh page after logout
    console.log('Logout successful, refreshing page...');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">Evergreen Living</span>
          </Link>

          {/* Menu Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link to="/indoor" className="text-gray-700 hover:text-green-600 transition">
              Indoor Plants
            </Link>
            <Link to="/herbal" className="text-gray-700 hover:text-green-600 transition">
              Herbal Plants
            </Link>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  {/* User Info */}
                  <span className="text-sm text-gray-600">
                    Hi, <strong>{user?.name || user?.email}</strong>
                  </span>

                  {/* Dashboard Link for Admin */}
                  {user?.role === 'admin' && (
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-green-600 transition font-medium"
                    >
                      Dashboard
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Register Link */}
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-green-600 transition font-medium"
                  >
                    Register
                  </Link>

                  {/* Login Button */}
                  <Link
                    to="/login"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;