import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import PlantCard from "./PlantCard";
import PlantCardSkeleton from "./PlantCardSkeleton";

import { getPlants } from "../services/plantService";

function FeaturedPlants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const data = await getPlants();

      setPlants(data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-green-700">
            Featured Plants
          </h2>

          <p className="text-center text-gray-500 mt-3 mb-12">
            Explore the newest plants added by our gardeners.
          </p>
        </motion.div>

        {loading ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <PlantCardSkeleton key={index} />
            ))}
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
              />
            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default FeaturedPlants;