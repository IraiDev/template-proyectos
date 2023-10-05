import { router } from "@router/Router"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"

export default function App() {
  return (
    <Suspense fallback="cargando...">
      <RouterProvider router={router} />
    </Suspense>
  )
}
