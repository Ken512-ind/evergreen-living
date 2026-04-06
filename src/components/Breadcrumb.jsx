import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="mb-6 text-sm text-gray-500">

      <Link
        to="/"
        className="hover:text-green-700"
      >
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to =
          "/" +
          pathnames
            .slice(0, index + 1)
            .join("/");

        const isLast =
          index === pathnames.length - 1;

        const label = value
          .replace("-", " ")
          .replace(/\b\w/g, (l) =>
            l.toUpperCase()
          );

        return (
          <span key={to}>
            {" / "}

            {isLast ? (
              <span className="text-green-700 font-medium">
                {label}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-green-700"
              >
                {label}
              </Link>
            )}

          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;