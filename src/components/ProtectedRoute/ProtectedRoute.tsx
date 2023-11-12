import { useNavigate } from "react-router-dom";

import useAuth from "../../contexts/AuthContext";
import { ProtectedRouteProps } from "./ProtectedRoute.props";
import { UserApi } from "../../api";
import { useEffect } from "react";

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { role, children } = props;

  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const user = await UserApi.getSelf();

      if (role === "admin" && !user?.is_admin) {
        navigate("/");
        return;
      }
    } catch (error) {
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return children;
};

export default ProtectedRoute;
