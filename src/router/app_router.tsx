import { createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import HomeView from "@modules/home/home_view"
import NotAuthGuard from "./guards/not_auth_guard"
import AuthGuard from "./guards/auth_guard"
import LoginPage from "@modules/auth/pages/login_page"
import RenewPage from "@modules/auth/pages/renew_page"

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <RenewPage />,
      },
      {
        path: routes.private.home,
        element: (
          <AuthGuard>
            <HomeView />
          </AuthGuard>
        ),
      },
      {
        path: routes.public.login,
        element: (
          <NotAuthGuard>
            <LoginPage />
          </NotAuthGuard>
        ),
      },
    ],
  },
])
