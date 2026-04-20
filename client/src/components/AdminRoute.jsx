import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const storedUser =
    localStorage.getItem("user");

  /*
  BELUM LOGIN
  */
  if (!storedUser) {
    return <Navigate to="/" />;
  }

  const user =
    JSON.parse(storedUser);

  /*
  BUKAN ADMIN
  */
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  /*
  IZINKAN AKSES
  */
  return children;
}

export default AdminRoute;