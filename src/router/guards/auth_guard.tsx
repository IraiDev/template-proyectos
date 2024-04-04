import { useAuthStore } from "@features/auth/stores"
import { Navigate } from "react-router-dom"

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isSignIn = useAuthStore((state) => state.isSignIn)

  if (!isSignIn) return <Navigate to="/" replace />

  return children
}
