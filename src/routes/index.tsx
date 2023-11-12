import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { AlbumDetail, Login, Signup, RedeemToken } from "../pages";
import { ProtectedRoute } from "../components";
import { AuthProvider } from "../contexts/AuthContext";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthProviderLayout />,
    children: [
      // {
      //     path: "/",
      //     element: <Home />
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
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
        path: "/redeem-token",
        element: <RedeemToken  />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
