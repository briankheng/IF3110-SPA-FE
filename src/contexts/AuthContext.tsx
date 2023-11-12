import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { UserApi } from "../api";
import { AuthRequest } from "../types";

type AuthContext = {
  token: string | null;
  login: (payload: AuthRequest) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContext>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const user = await UserApi.getSelf();

          if (user) {
            setToken(token);
          }
        } catch (error) {
          Cookies.remove("token");
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (payload: AuthRequest) => {
    try {
      const auth = await UserApi.login(payload);

      if (auth) {
        Cookies.set("token", auth.token);
        setToken(auth.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
