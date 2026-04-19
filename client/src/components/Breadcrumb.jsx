import { Link } from "react-router-dom";

function Breadcrumb({ plant }) {
  if (!plant) return null;

  const categoryPath =
    plant.category === "indoor"
      ? "/indoor"
      : "/herbal";

  const categoryName =
    plant.category === "indoor"
      ? "Indoor Plants"
      : "Herbal Plants";

  return (
    <nav className="mb-6 text-sm text-gray-600">

      <Link
        to="/"
        className="hover:text-green-700"
      >
        Home
      </Link>

      <span className="mx-2">/</span>

      <Link
        to={categoryPath}
        className="hover:text-green-700"
      >
        {categoryName}
      </Link>

      <span className="mx-2">/</span>

      <span className="text-gray-800 font-medium">
        {plant.name}
      </span>

    </nav>
  );
}

export default Breadcrumb;