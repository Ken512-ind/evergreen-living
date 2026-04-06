import { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import SkeletonCard from "../components/SkeletonCard";
import Breadcrumb from "../components/Breadcrumb";
import useDebounce from "../hooks/useDebounce";
import { plants } from "../data/plants";

function HerbalPlants() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [visible, setVisible] = useState(3);
  const [loading, setLoading] = useState(true);

  const debouncedSearch =
    useDebounce(search);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearch, sort]);

  const allHerbal = plants.filter(
    (plant) => plant.category === "herbal"
  );

  const filteredHerbal =
    allHerbal.filter((plant) =>
      plant.name
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
    );

  let sortedHerbal = [
    ...filteredHerbal,
  ];

  if (sort === "asc") {
    sortedHerbal.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "desc") {
    sortedHerbal.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const herbalPlants =
    sortedHerbal.slice(0, visible);

  return (
    <div className="py-20 bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <Breadcrumb />

        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Herbal Plants
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search plant..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisible(3);
            }}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setVisible(3);
            }}
            className="w-full md:w-48 px-4 py-2 border rounded-lg"
          >
            <option value="default">
              Sort: Default
            </option>

            <option value="asc">
              Name A-Z
            </option>

            <option value="desc">
              Name Z-A
            </option>

          </select>

        </div>

        {loading ? (

          <div className="grid md:grid-cols-3 gap-8">

            {[...Array(3)].map(
              (_, index) => (
                <SkeletonCard key={index} />
              )
            )}

          </div>

        ) : herbalPlants.length > 0 ? (

          <>
            <div className="grid md:grid-cols-3 gap-8">

              {herbalPlants.map(
                (plant) => (
                  <PlantCard
                    key={plant.slug}
                    name={plant.name}
                    latin={plant.latin}
                    image={plant.image}
                    slug={plant.slug}
                  />
                )
              )}

            </div>

            {visible <
              sortedHerbal.length && (
              <div className="text-center mt-10">

                <button
                  onClick={() =>
                    setVisible(
                      visible + 3
                    )
                  }
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-300"
                >
                  Load More
                </button>

              </div>
            )}

          </>

        ) : (

          <div className="text-center py-16">

            <h2 className="text-xl font-semibold text-gray-700">
              No plants found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching another plant
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default HerbalPlants;