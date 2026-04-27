import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getPlants,
  deletePlant,
} from "../services/plantService";

function Dashboard() {
  const navigate =
    useNavigate();

  const [plants, setPlants] =
    useState([]);

  /*
  FETCH
  */

  const fetchPlants =
    async () => {
      try {
        const data =
          await getPlants();

        setPlants(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchPlants();
  }, []);

  /*
  DELETE
  */

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Yakin ingin menghapus?"
        )
      )
        return;

      try {
        await deletePlant(id);

        fetchPlants();

      } catch (error) {
        alert(
          "Delete gagal"
        );
      }
    };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={() =>
            navigate(
              "/add-plant"
            )
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Plant
        </button>

      </div>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-2">
              Name
            </th>

            <th className="p-2">
              Category
            </th>

            <th className="p-2">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {plants.map(
            (plant) => (
              <tr
                key={plant._id}
                className="border-t"
              >
                <td className="p-2">
                  {plant.name}
                </td>

                <td className="p-2">
                  {plant.category}
                </td>

                <td className="p-2 flex gap-2">

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        plant._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;