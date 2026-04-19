import { useNavigate } from "react-router-dom";

function CategoryCard({ title, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === "Indoor Plants") {
      navigate("/indoor");
    }

    if (title === "Herbal Plants") {
      navigate("/herbal");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        flex
        items-center
        justify-between
        hover:shadow-lg
        transition
        cursor-pointer
      "
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {title}
        </h3>

        <button
          className="
            border
            border-green-700
            text-green-700
            px-4
            py-2
            rounded-full
            hover:bg-green-700
            hover:text-white
            transition
          "
        >
          See more
        </button>
      </div>

      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-contain"
      />
    </div>
  );
}

export default CategoryCard;