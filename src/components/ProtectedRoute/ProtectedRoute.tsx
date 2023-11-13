import { useNavigate } from "react-router-dom";

import useAuth from "../../contexts/AuthContext";
import { ProtectedRouteProps } from "./ProtectedRoute.props";
import { UserApi } from "../../api";
import { useEffect } from "react";

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { role, children } = props;

  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      if (role === "admin" && !isAdmin) {
        navigate("/");
        return;
      }
    } catch (error) {
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
