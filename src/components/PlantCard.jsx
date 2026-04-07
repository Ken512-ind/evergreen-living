import { Link } from "react-router-dom";

function PlantCard({
  name,
  latin,
  image,
  slug,
}) {
  return (
    <Link to={`/plant/${slug}`}>

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
          transition
          duration-300
          transform
          hover:-translate-y-1
          hover:shadow-xl
        "
      >

        {/* Image */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/fallback.jpg";
          }}
          className="
            w-full
            h-48
            object-cover
            transition
            duration-300
            hover:scale-105
          "
        />

        {/* Content */}
        <div className="p-4">

          <h3 className="text-lg font-semibold text-gray-800">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {latin}
          </p>

        </div>

      </div>

    </Link>
  );
}

export default PlantCard;