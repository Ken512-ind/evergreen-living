import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-green-800">
          404
        </h1>

        <p className="text-lg text-gray-600 mt-4">
          Page not found
        </p>

        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="
            inline-block
            mt-6
            bg-green-700
            text-white
            px-6
            py-2
            rounded-lg
            hover:bg-green-800
            transition
            duration-300
          "
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;