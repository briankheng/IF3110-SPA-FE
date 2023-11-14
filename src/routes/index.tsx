import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { AlbumDetail, Login, Register, RedeemToken, Search, Home, ChooseCategory, Category, NotFound, TestAlbumDetail } from "../pages";
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
        element: (
          <ProtectedRoute role="user">
            <Search />
          </ProtectedRoute>
        ),
      },
      {
        path: "/choose-category",
        element: (
          <ProtectedRoute role="user">
            <ChooseCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category",
        element: (
          <ProtectedRoute role="user">
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "/redeem-token",
        element: (
          <ProtectedRoute role="user">
            <RedeemToken />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute role="user">
            <NotFound />
          </ProtectedRoute>
        ),
      },
      {
        path: "/abc",
        element: (
          <TestAlbumDetail />
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
