import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";

function Login() {
  const [form, setForm] = useState({
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
  HANDLE LOGIN
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data =
        await loginUser(form);

      /*
      SIMPAN USER
      */
      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      alert(
        "Login berhasil"
      );

      /*
      REFRESH + KEMBALI KE HOME
      */
      window.location.href =
        "/";

    } catch (error) {
      alert(
        error.message ||
          "Login gagal"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={
              form.email
            }
            onChange={
              handleChange
            }
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={
              form.password
            }
            onChange={
              handleChange
            }
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Belum punya akun?
          <Link
            to="/register"
            className="text-green-600 ml-1 hover:underline"
          >
            Daftar
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;