import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { AppRouter } from "@router/app_router"
import ToastProvider from "@modules/core/components/ui/toast_provider"
import Alert from "@modules/core/components/ui/alert"

export default function App() {
  return (
    <NextUIProvider>
      <ToastProvider />
      <Alert />
      <Suspense fallback={"Cargando..."}>
        <RouterProvider router={AppRouter} />
      </Suspense>
    </NextUIProvider>
  )
}
