import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { AlbumDetail, Login, Register, RedeemToken, Album, Search, Home, ChooseCategory } from "../pages";
import { ProtectedRoute, Navbar, Footer } from "../components";
import { AuthProvider } from "../contexts/AuthContext";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthProviderLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute role="user">
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/album",
        element: <Album />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/album/:id",
        element: (
          <ProtectedRoute role="user">
            <AlbumDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/choose-category",
        element: <ChooseCategory />,
      },
      {
        path: "/redeem-token",
        element: <RedeemToken />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
