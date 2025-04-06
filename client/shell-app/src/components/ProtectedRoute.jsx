import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Loader from "./UI/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
