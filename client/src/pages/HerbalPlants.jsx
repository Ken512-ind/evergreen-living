import { useEffect, useState } from "react";

import PlantCard from "../components/PlantCard";
import PlantCardSkeleton from "../components/PlantCardSkeleton";
import { getPlantsByCategory } from "../services/plantService";

function HerbalPlants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);

      const data = await getPlantsByCategory("Herbal");

      setPlants(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load herbal plants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Herbal Plants
      </h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <PlantCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 py-20">
          {error}
        </div>
      )}

      {!loading && !error && plants.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No herbal plants found.
        </div>
      )}

      {!loading && !error && plants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default HerbalPlants;