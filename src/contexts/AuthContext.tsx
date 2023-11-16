import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { UserApi } from "../api";
import { AuthRequest } from "../types";

type AuthContext = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  login: (payload: AuthRequest) => void;
  logout: () => void;
  name: string;
  userId: number;
  coin: number;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  login: () => {},
  logout: () => {},
  name: "",
  userId: 0,
  coin: 0
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("user");
  const [userId, setUserId] = useState(0);
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const user = await UserApi.getSelf();

          if (user) {
            setIsAuthenticated(true);

            const payload = jwtDecode(token) as any;
            setIsAdmin(payload.isAdmin);
            setName(user.name);
            setUserId(user.id);
            setCoin(user.coins);

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
        setIsAuthenticated(true);

        const payload = jwtDecode(auth.token) as any;
        setIsAdmin(payload.isAdmin);

        Cookies.set("token", auth.token);
        setToken(auth.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    Cookies.remove("token");
    setToken(null);
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, token, login, logout, name, userId, coin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
