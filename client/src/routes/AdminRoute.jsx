import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /*
  NOT LOGGED IN
  */
  if (!token) {
    return <Navigate to="/login" />;
  }

  /*
  NOT ADMIN
  */
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  /*
  ALLOWED
  */
  return children;
};

export default AdminRoute;