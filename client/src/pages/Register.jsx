import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  /*
  HANDLE INPUT
  */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  /*
  SUBMIT REGISTER
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(form);

      alert(
        "Registrasi berhasil"
      );

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Register gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* NAME */}

        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading
            ? "Loading..."
            : "Register"}
        </button>

        <p className="text-center mt-4">

          Sudah punya akun?

          <Link
            to="/login"
            className="text-green-600 ml-1"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;