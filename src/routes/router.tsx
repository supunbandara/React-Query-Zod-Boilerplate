import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./error-page";
import { PrivateRoute, PublicRoute } from "./route-guard";
import { Routes } from "../lib/utils/routes-constants";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <h1>Dashboard</h1>,
      },
      {
        path: Routes.PROFILE,
        element: (
          <PrivateRoute>
            <h1>Profile Page</h1>
          </PrivateRoute>
        ),
      },
      {
        path: Routes.SIGNUP,
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: Routes.SIGNIN,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
]);
