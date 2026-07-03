import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  login,
  getCurrentUser,
  isAuthenticated,
} from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getCurrentUser();

    if (user && isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(email, password);

      if (response.user) {
        toast.success(`Welcome back, ${response.user.name}!`);

        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Email atau password salah.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-6">
          Login
        </h1>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">

          Belum punya akun?

          <Link
            to="/register"
            className="text-green-600 ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;