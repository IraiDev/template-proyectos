import { createBrowserRouter } from "react-router-dom"
import { AuthGuard, NotAuthGuard } from "./guards"
import { routes } from "./routes"
import { LoginPage, RenewPage } from "@modules/auth/pages"
import { HomeView } from "@modules/home/home_view"

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
