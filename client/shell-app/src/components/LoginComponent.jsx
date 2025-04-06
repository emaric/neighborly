import { lazy, Suspense, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const AuthLoginComponent = lazy(() => import("authApp/LoginComponent"));

function LoginComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user, refetch } = useContext(AuthContext);

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleLoginSuccess = async () => {
    refetch();
    navigate("/");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLoginComponent onSuccess={handleLoginSuccess} />
    </Suspense>
  );
}

export default LoginComponent;
