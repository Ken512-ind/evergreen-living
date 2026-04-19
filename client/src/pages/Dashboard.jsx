import { useEffect, useState } from "react";

import {
  getPlants,
  deletePlant,
} from "../services/plantService";

import { Link } from "react-router-dom";

function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const data = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus tanaman ini?"
    );

    if (!confirmDelete) return;

    try {
      await deletePlant(id);
      fetchPlants();
    } catch (error) {
      console.error(error);
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

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <Link
          to="/add-plant"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Plant
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full bg-white rounded-xl shadow">

          <thead>

            <tr className="bg-gray-100 text-left">

              <th className="p-3">
                Name
              </th>

              <th className="p-3">
                Category
              </th>

              <th className="p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {plants.map((plant) => (

              <tr
                key={plant._id}
                className="border-t"
              >

                <td className="p-3">
                  {plant.name}
                </td>

                <td className="p-3">
                  {plant.category}
                </td>

                <td className="p-3 space-x-2">

                  <Link
                    to={`/edit-plant/${plant._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(plant._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;