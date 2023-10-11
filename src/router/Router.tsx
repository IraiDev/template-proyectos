import { createBrowserRouter, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "@configs/routes"
import { lazy } from "react"

// views

// layouts
const PublicLayout = lazy(() => import("@layouts/PublicLayout"))
const PrivateLayout = lazy(() => import("@layouts/PrivateLayout"))

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={privateRoutes.home} />,
      },
      {
        path: privateRoutes.home,
        element: "HOME VIEW",
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: publicRoutes.login,
        element: "LOGIN VIEW",
      },
    ],
  },
  {
    path: publicRoutes.renew,
    element: "RENEW VIEW",
  },
])
