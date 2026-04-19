import { useEffect, useState } from "react";

import PlantCard from "../components/PlantCard";
import { getPlants } from "../services/plantService";

function IndoorPlants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const data = await getPlants();

      const indoorPlants = data.filter(
        (plant) => plant.category === "indoor"
      );

      setPlants(indoorPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

      <h1 className="text-3xl font-bold mb-8">
        Indoor Plants
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {plants.map((plant) => (
          <PlantCard
            key={plant._id}
            plant={plant}
          />
        ))}

      </div>

    </div>
  );
}

export default IndoorPlants;