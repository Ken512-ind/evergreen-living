import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  getPlants,
  deletePlant,
} from "../services/plantService";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function Dashboard() {
  const navigate = useNavigate();

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 10;

  const fetchPlants = async () => {
    try {
      const data = await getPlants();
      setPlants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Plant?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await deletePlant(id);

      setPlants((prev) =>
        prev.filter((plant) => plant.id !== id)
      );

      toast.success("Plant deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete plant.");
    }
  };

  const latestPlant = plants[0];

  const totalPlants = plants.length;

  const indoorPlants = plants.filter(
    (plant) => plant.category === "Indoor"
  ).length;

  const herbalPlants = plants.filter(
    (plant) => plant.category === "Herbal"
  ).length;

  const filteredPlants = plants.filter((plant) => {
    const keyword = search.trim().toLowerCase();

    return (
      plant.name?.toLowerCase().includes(keyword) ||
      plant.latin?.toLowerCase().includes(keyword) ||
      plant.category?.toLowerCase().includes(keyword) ||
      plant.difficulty?.toLowerCase().includes(keyword)
    );
  });

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;

  const currentPlants = filteredPlants.slice(
    indexOfFirstPlant,
    indexOfLastPlant
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPlants.length / plantsPerPage)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const difficultyBadgeClass = (difficulty) => {
    if (difficulty === "Easy") return "bg-green-100 text-green-700";
    if (difficulty === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Dashboard
          </h1>

          <input
              type="text"
              placeholder="🔍 Search plants by name, latin, category ..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="
                  border
                  rounded-xl
                  px-4
                  py-3
                  mt-6
                  mb-8
                  w-full
                  md:w-80
              "
          />

          <p className="text-gray-500">
            Evergreen Living Admin Panel
          </p>
        </div>

        <button
          onClick={() => navigate("/add-plant")}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            w-full
            md:w-auto
          "
        >
          + Add Plant
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">

        <div className="bg-white rounded-xl shadow p-4 md:p-6">

          <h3 className="text-gray-500 text-sm md:text-base">
            Total Plants
          </h3>

          <p className="text-2xl md:text-4xl font-bold text-green-700 mt-2 md:mt-3">
            {totalPlants}
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">

          <h3 className="text-gray-500 text-sm md:text-base">
            Indoor
          </h3>

          <p className="text-2xl md:text-4xl font-bold text-green-600 mt-2 md:mt-3">
            {indoorPlants}
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">

          <h3 className="text-gray-500 text-sm md:text-base">
            Herbal
          </h3>

          <p className="text-2xl md:text-4xl font-bold text-orange-500 mt-2 md:mt-3">
            {herbalPlants}
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">

          <h3 className="text-gray-500 text-sm md:text-base">
            Latest Plant
          </h3>

          <p className="text-base md:text-xl font-bold mt-2 md:mt-3 truncate">
            {latestPlant?.name || "-"}
          </p>

        </div>

      </div>

      {loading ? (

        <div className="text-center py-10">
          Loading...
        </div>

      ) : (

        <>

          {/* Desktop Table View */}

          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">

            <table className="w-full">

              <thead className="bg-green-50">

                <tr>

                  <th className="p-4">
                    Image
                  </th>

                  <th className="p-4">
                    Name
                  </th>

                  <th className="p-4">
                    Category
                  </th>

                  <th className="p-4">
                    Difficulty
                  </th>

                  <th className="p-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentPlants.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="text-center py-12 text-gray-500"
                    >
                      🌿 No plants found.
                    </td>

                  </tr>

                ) : (

                  currentPlants.map((plant) => (

                    <tr
                      key={plant.id}
                      className="border-t"
                    >

                      <td className="p-3">

                        <img
                          src={
                            plant.image
                              ? `${API_BASE}${plant.image}`
                              : "/placeholder.jpg"
                          }
                          alt={plant.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                      </td>

                      <td className="font-medium">
                        {plant.name}
                      </td>

                      <td>
                        {plant.category}
                      </td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${difficultyBadgeClass(plant.difficulty)}`}
                        >
                          {plant.difficulty}
                        </span>

                      </td>

                      <td className="space-x-2">

                        <button
                          onClick={() =>
                            navigate(`/edit-plant/${plant.id}`)
                          }
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                          "
                        >
                          ✏ Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(plant.id)
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                          "
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* Mobile Card View */}

          <div className="md:hidden space-y-4">

            {currentPlants.length === 0 ? (

              <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow">
                🌿 No plants found.
              </div>

            ) : (

              currentPlants.map((plant) => (

                <div
                  key={plant.id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4"
                >

                  <img
                    src={
                      plant.image
                        ? `${API_BASE}${plant.image}`
                        : "/placeholder.jpg"
                    }
                    alt={plant.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">

                    <h3 className="font-semibold text-gray-800 truncate">
                      {plant.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      {plant.category}
                    </p>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${difficultyBadgeClass(plant.difficulty)}`}
                    >
                      {plant.difficulty}
                    </span>

                    <div className="flex gap-2 mt-3">

                      <button
                        onClick={() =>
                          navigate(`/edit-plant/${plant.id}`)
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(plant.id)
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

          {/* Pagination - shared between table & card view */}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 py-6">

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  disabled:opacity-40
                "
              >
                ← Prev
              </button>

              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  disabled:opacity-40
                "
              >
                Next →
              </button>

            </div>
          )}

        </>

      )}

    </div>
  );
}

export default Dashboard;