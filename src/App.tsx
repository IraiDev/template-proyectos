import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { ToastProvider } from "@components/shared"
import { Router } from "@router/Router"

export default function App() {
  return (
    <Suspense fallback="cargando...">
      <ToastProvider />
      <RouterProvider router={Router} />
    </Suspense>
  )
}
