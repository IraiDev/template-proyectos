import { isInLocalStorage } from "@utils/functions"
import { Navigate } from "react-router-dom"

export const NotAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const hasSession = isInLocalStorage("TEST")

  if (hasSession) return <Navigate to="/" replace />

  return children
}
