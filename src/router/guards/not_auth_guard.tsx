import { isInLocalStorage } from "@utils/index"
import { Navigate } from "react-router-dom"

const NotAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const hasSession = isInLocalStorage("TOKEN_KEY")

  if (hasSession) return <Navigate to="/" replace />

  return children
}

export default NotAuthGuard
