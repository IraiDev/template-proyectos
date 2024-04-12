import { useAuth } from "@modules/auth/hooks"
import { Navigate } from "react-router-dom"

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isSignIn } = useAuth()

  if (!isSignIn) return <Navigate to="/" replace />

  return children
}
