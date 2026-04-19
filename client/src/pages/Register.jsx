import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(
        name,
        email,
        password
      );

      navigate("/login");

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Register
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full border px-4 py-2 rounded"
            />

          </div>

          <div className="mb-4">

            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full border px-4 py-2 rounded"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="w-full border px-4 py-2 rounded"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        <p className="mt-4 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-green-700 ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </section>
  );
}

export default Register;