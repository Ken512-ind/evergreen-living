import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PlantCard({ plant }) {
  return (
    <Link to={`/plant/${plant.slug}`}>

      <motion.div
        className="
          bg-white
          rounded-xl
          overflow-hidden
          shadow-sm
          transition
        "

        whileHover={{
          scale: 1.04,
          y: -6,
        }}

        whileTap={{
          scale: 0.97,
        }}

        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
      >

        {/* IMAGE */}

        <div className="overflow-hidden">

          <motion.img
            src={`/src/assets/${plant.image}`}
            alt={plant.name}
            className="
              w-full
              h-48
              object-cover
              transition
            "

            whileHover={{
              scale: 1.08,
            }}

            transition={{
              duration: 0.35,
            }}
          />

        </div>

        {/* CONTENT */}

        <div className="p-4">

          <h3
            className="
              font-semibold
              text-lg
              mb-1
              transition-colors
              group-hover:text-green-600
            "
          >
            {plant.name}
          </h3>

          <p className="text-gray-500 text-sm">
            {plant.latin}
          </p>

        </div>

      </motion.div>

    </Link>
  );
}

export default PlantCard;