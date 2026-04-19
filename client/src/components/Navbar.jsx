import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-700 font-semibold"
      : "text-gray-700 hover:text-green-700 transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"
          className="text-xl font-bold text-green-700"
        >
          Evergreen Living
        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={linkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/indoor"
            className={linkClass}
          >
            Indoor Plants
          </NavLink>

          <NavLink
            to="/herbal"
            className={linkClass}
          >
            Herbal Plants
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                className={linkClass}
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </NavLink>
          )}

        </div>

        {/* HAMBURGER BUTTON */}

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}

      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ${isOpen ? "max-h-96" : "max-h-0"}
        `}
      >
        <div className="bg-white border-t px-6 py-4 space-y-4">

          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/indoor"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Indoor Plants
          </NavLink>

          <NavLink
            to="/herbal"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Herbal Plants
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="block w-full bg-red-500 text-white px-4 py-2 rounded-lg text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="block bg-green-600 text-white px-4 py-2 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}

        </div>
      </div>

    </nav>
  );
}

export default Navbar;