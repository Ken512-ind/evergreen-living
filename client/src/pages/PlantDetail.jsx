import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getPlantBySlug } from "../services/plantService";

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

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="text-center py-20">
        Plant not found
      </div>
    );
  }

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

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}

        <motion.img
          src={`/src/assets/${plant.image}`}
          alt={plant.name}
          className="w-full max-h-[420px] object-contain rounded-xl bg-white"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.target.src = "/fallback.jpg";
          }}
        />

        {/* TEXT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {plant.name}
          </h1>

          <p className="italic text-gray-600 mb-4">
            {plant.latin}
          </p>

          <p className="mb-2">
            <span className="font-semibold">
              Category:
            </span>{" "}
            {plant.category}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {plant.description}
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}

export default PlantDetail;