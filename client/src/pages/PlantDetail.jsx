import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getPlantBySlug } from "../services/plantService";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function PlantDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlant();
  }, [slug]);

  const fetchPlant = async () => {
    try {
      const data = await getPlantBySlug(slug);
      setPlant(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== LOADING (Skeleton) =====
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 animate-pulse">

        <div className="h-10 w-24 bg-gray-200 rounded-lg mb-6" />

        <div className="w-full h-[320px] md:h-[420px] bg-gray-200 rounded-xl mb-8" />

        <div className="h-8 w-1/2 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-6" />

        <div className="flex gap-3 mb-8">
          <div className="h-9 w-24 bg-gray-200 rounded-full" />
          <div className="h-9 w-24 bg-gray-200 rounded-full" />
        </div>

        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-8" />

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
        </div>

      </div>
    );
  }

  // ===== PLANT NOT FOUND =====
  if (!plant) {
    return (
      <div className="text-center py-20">

        <div className="text-6xl mb-4">
          🌿
        </div>

        <p className="text-xl font-semibold text-gray-700 mb-2">
          Plant not found.
        </p>

        <p className="text-gray-500 mb-6">
          Tanaman yang kamu cari tidak tersedia atau sudah dihapus.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          Return Home
        </button>

      </div>
    );
  }

  // ===== PLANT DETAIL =====
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* IMAGE */}

      <motion.div
        className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden bg-gray-100 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >

        {/* Blurred fill background, dibuat dari foto yang sama */}
        <img
          src={
            plant.image
              ? `${API_BASE}${plant.image}`
              : "/placeholder.jpg"
          }
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
        />

        {/* Gambar utama, tetap utuh tanpa terpotong */}
        <img
          src={
            plant.image
              ? `${API_BASE}${plant.image}`
              : "/placeholder.jpg"
          }
          alt={plant.name}
          className="relative z-10 w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "/fallback.jpg";
          }}
        />

      </motion.div>

      {/* BASIC INFO */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {plant.name}
        </h1>

        <p className="italic text-gray-500 mb-6">
          {plant.latin}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">

          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            🟢 {plant.category}
          </span>

          <span
            className={`
              px-4
              py-2
              rounded-full
              font-medium

              ${
                plant.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : plant.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            ⭐ {plant.difficulty}
          </span>

        </div>

        {/* DESCRIPTION */}

        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-3">
            Description
          </h2>

          <p className="text-gray-700 leading-8">
            {plant.description}
          </p>

        </div>

        {/* CARE GUIDE */}

        <div>

          <h2 className="text-xl font-semibold mb-4">
            Care Guide
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">

            <div className="bg-white shadow rounded-xl p-5">

              <h3 className="font-semibold mb-2">
                💧 Watering
              </h3>

              <p className="text-gray-600">
                {plant.watering}
              </p>

            </div>

            <div className="bg-white shadow rounded-xl p-5">

              <h3 className="font-semibold mb-2">
                ☀ Sunlight
              </h3>

              <p className="text-gray-600">
                {plant.sunlight}
              </p>

            </div>

            <div className="bg-white shadow rounded-xl p-5">

              <h3 className="font-semibold mb-2">
                🌡 Temperature
              </h3>

              <p className="text-gray-600">
                {plant.temperature}
              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}

export default PlantDetail;