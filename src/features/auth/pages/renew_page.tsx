import { privateRoutes } from "@configs/routes"
import { useRenew } from "@features/auth/hooks"
import { Navigate } from "react-router-dom"

export const RenewPage = () => {
  const { isSignIn, hasSession } = useRenew()

  if (!hasSession) return <Navigate to="/login" replace />

  if (isSignIn) return <Navigate to={privateRoutes.home} replace />

  return <div>validando sesion...</div>
}
