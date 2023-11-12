import {
  Outlet,
  RouteObject,
  createBrowserRouter,
  Link,
} from "react-router-dom";
import {
  AlbumDetail,
  Login,
  Register,
  RedeemToken,
  Album,
  Home,
} from "../pages";
import { ProtectedRoute } from "../components";
import { AuthProvider } from "../contexts/AuthContext";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <h1> KBL-SPA CEK CEKKK </h1>
      <Link to="/">Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
      <Link to="/album">Album&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
      <Link to="/login">Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
      <Outlet />
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
        path: "/redeem-token",
        element: <RedeemToken />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
