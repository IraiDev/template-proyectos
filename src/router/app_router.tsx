import { LoginPage, RenewPage } from "@features/auth/pages"
import { HomeView } from "@features/home/home_view"
import { createBrowserRouter } from "react-router-dom"
import { AuthGuard, NotAuthGuard } from "./guards"
import { routes } from "./routes"

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
