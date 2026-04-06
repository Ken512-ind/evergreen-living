import { useState } from "react";
import { Link } from "react-router-dom";
import { plants } from "../data/plants";

function SearchBar() {
  const [search, setSearch] = useState("");

  const results = plants.filter((plant) =>
    plant.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full md:w-56">

      <input
        type="text"
        placeholder="Search plant..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full px-4 py-2 border rounded-lg text-sm"
      />

      {search && (
        <div className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

          {results.length > 0 ? (
            results.map((plant) => (
              <Link
                key={plant.slug}
                to={`/plant/${plant.slug}`}
                onClick={() =>
                  setSearch("")
                }
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {plant.name}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">
              No plants found
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default SearchBar;