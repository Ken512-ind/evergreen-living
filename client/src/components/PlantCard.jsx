import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE =
  import.meta.env.VITE_API_URL || "";

function PlantCard({ plant }) {
  const isNewPlant = () => {
    if (!plant.createdAt) return false;

    const created = new Date(plant.createdAt);
    const now = new Date();

    const diff =
      (now - created) / (1000 * 60 * 60 * 24);

    return diff <= 7;
  };

  return (
    <Link to={`/plant/${plant.slug}`}>
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          shadow
          hover:shadow-xl
          duration-300
        "
      >
        {/* IMAGE */}

        <div className="relative overflow-hidden">

          {isNewPlant() && (
            <span
              className="
                absolute
                top-3
                left-3
                z-10
                bg-red-500
                text-white
                text-xs
                font-bold
                px-3
                py-1
                rounded-full
                shadow
              "
            >
              NEW
            </span>
          )}

          <motion.img
            src={
              plant.image
                ? `${API_BASE}${plant.image}`
                : "/placeholder.jpg"
            }
            alt={plant.name}
            className="
              w-full
              h-60
              object-cover
            "
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.35,
            }}
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
            }}
          />

        </div>

        {/* CONTENT */}

        <div className="p-5">

          <span
            className={`
              inline-block
              text-xs
              px-3
              py-1
              rounded-full
              font-semibold
              mb-3

              ${
                plant.category === "Indoor"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }
            `}
          >
            {plant.category}
          </span>

          <h3 className="text-xl font-bold text-gray-800">
            {plant.name}
          </h3>

          <p className="italic text-gray-500 mt-1">
            {plant.latin}
          </p>

          <div className="mt-4 flex justify-between items-center">

            <span
              className={`
                text-sm
                font-medium

                ${
                  plant.difficulty === "Easy"
                    ? "text-green-600"
                    : plant.difficulty === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              `}
            >
              {plant.difficulty || "Unknown"}
            </span>

            <span
              className="
                text-green-600
                font-semibold
              "
            >
              View →
            </span>

          </div>

        </div>

      </motion.div>
    </Link>
  );
}

export default PlantCard;