import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

function Navbar() {
  const location =
    useLocation();

  const [user, setUser] =
    useState(null);

  /*
  CHECK LOGIN
  */
  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      );
    }
  }, []);

  /*
  LOGOUT
  */
  const handleLogout = () => {
    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/";
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-green-600 font-semibold"
      : "text-gray-700";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          Evergreen Living
        </Link>

        {/* MENU */}

        <div className="flex items-center gap-8">

          <Link
            to="/"
            className={`${isActive(
              "/"
            )} hover:text-green-600 transition`}
          >
            Home
          </Link>

          <Link
            to="/indoor"
            className={`${isActive(
              "/indoor"
            )} hover:text-green-600 transition`}
          >
            Indoor Plants
          </Link>

          <Link
            to="/herbal"
            className={`${isActive(
              "/herbal"
            )} hover:text-green-600 transition`}
          >
            Herbal Plants
          </Link>

          {/* DASHBOARD */}

          {user &&
            user.role ===
              "admin" && (
              <Link
                to="/dashboard"
                className="hover:text-green-600 transition"
              >
                Dashboard
              </Link>
            )}

          {/* LOGIN / LOGOUT */}

          {user ? (
            <button
              onClick={
                handleLogout
              }
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;