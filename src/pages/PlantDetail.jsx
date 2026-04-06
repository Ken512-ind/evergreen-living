import { useParams, useNavigate } from "react-router-dom";
import { plants } from "../data/plants";
import Breadcrumb from "../components/Breadcrumb";

function PlantDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const plant = plants.find(
    (item) => item.slug === slug
  );

  if (!plant) {
    return (
      <div className="py-20 text-center">
        Plant not found
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-100 min-h-screen">

      <div className="max-w-5xl mx-auto px-6">

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-green-700 font-medium hover:underline"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src={plant.image}
            alt={plant.name}
            loading="lazy"
            className="rounded-xl shadow-md"
          />

          <div>

            <h1 className="text-3xl font-bold text-green-800 mb-2">
              {plant.name}
            </h1>

            <p className="text-gray-500 italic mb-6">
              {plant.latin}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {plant.description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PlantDetail;