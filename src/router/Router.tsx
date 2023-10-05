import { Outlet, createBrowserRouter, Navigate } from "react-router-dom"
import { publicRoutes } from "@configs/index"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to={publicRoutes.login} />,
      },
      {
        path: publicRoutes.login,
        element: "Login",
      },
    ],
  },
])
