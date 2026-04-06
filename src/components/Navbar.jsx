import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-700 font-semibold"
      : "text-gray-700 hover:text-green-600";

  return (
    <header className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-green-700">
          Evergreen Living
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-medium">

          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/indoor" className={linkClass}>
            Indoor Plants
          </NavLink>

          <NavLink to="/herbal" className={linkClass}>
            Herbal Plants
          </NavLink>

        </nav>

        {/* Desktop Search */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 border-t">

          {/* Mobile Search */}
          <SearchBar />

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 text-green-700 font-semibold"
                : "block py-2 text-gray-700 hover:text-green-600"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/indoor"
            className={({ isActive }) =>
              isActive
                ? "block py-2 text-green-700 font-semibold"
                : "block py-2 text-gray-700 hover:text-green-600"
            }
            onClick={() => setIsOpen(false)}
          >
            Indoor Plants
          </NavLink>

          <NavLink
            to="/herbal"
            className={({ isActive }) =>
              isActive
                ? "block py-2 text-green-700 font-semibold"
                : "block py-2 text-gray-700 hover:text-green-600"
            }
            onClick={() => setIsOpen(false)}
          >
            Herbal Plants
          </NavLink>

        </div>
      )}

    </header>
  );
}

export default Navbar;