import { privateRoutes, publicRoutes } from "@configs/routes"
import { useRenew } from "@features/auth/hooks"
import { Spinner } from "@nextui-org/react"
import { Navigate } from "react-router-dom"

export const RenewPage = () => {
  const { isSignIn, hasSession } = useRenew()

  if (!hasSession) return <Navigate to={publicRoutes.login} replace />

  if (isSignIn) return <Navigate to={privateRoutes.home} replace />

  return (
    <div className="h-screen w-full grid place-content-center">
      <section className="flex flex-col gap-2 items-center">
        <span>Validando Sesión...</span>
        <Spinner />
      </section>
    </div>
  )
}
