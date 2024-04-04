import { Navigate } from "react-router-dom"

export const NotAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const hasSession = localStorage.getItem("user") !== null

  if (hasSession) return <Navigate to="/" replace />

  return children
}
