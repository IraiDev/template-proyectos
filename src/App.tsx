import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { AppRouter } from "@router/app_router"
import { ToastProvider } from "@modules/core/components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider className="w-full min-h-screen overflow-auto bg-background text-foreground">
        <ToastProvider />
        <Suspense fallback={"Cargando..."}>
          <RouterProvider router={AppRouter} />
        </Suspense>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
