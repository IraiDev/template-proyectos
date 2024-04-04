import { privateRoutes, publicRoutes } from "@configs/routes"
import { HomeView } from "@features/home/home_view"
import { createBrowserRouter } from "react-router-dom"
import { AuthGuard, NotAuthGuard } from "./guards"
import { LoginPage, RenewPage } from "@features/auth/pages"

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <RenewPage />,
      },
      {
        path: privateRoutes.home,
        element: (
          <AuthGuard>
            <HomeView />
          </AuthGuard>
        ),
      },
      {
        path: publicRoutes.login,
        element: (
          <NotAuthGuard>
            <LoginPage />
          </NotAuthGuard>
        ),
      },
    ],
  },
])
