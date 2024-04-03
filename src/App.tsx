import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { MainRouter } from "@router/main_router"
import { ToastProvider } from "./components"

export default function App() {
  return (
    <NextUIProvider className="w-full min-h-screen bg-background text-foreground">
      <ToastProvider />
      <Suspense fallback={"Cargando..."}>
        <RouterProvider router={MainRouter} />
      </Suspense>
    </NextUIProvider>
  )
}
