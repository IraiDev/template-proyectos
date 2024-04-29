import Alert from "@modules/core/components/ui/alert"
import ToastProvider from "@modules/core/components/ui/toast_provider"
import { NextUIProvider } from "@nextui-org/react"
import { AppRouter } from "@router/app_router"
import { RouterProvider } from "react-router-dom"

export default function App() {
  return (
    <NextUIProvider>
      <ToastProvider />
      <Alert />
      <RouterProvider router={AppRouter} />
    </NextUIProvider>
  )
}
