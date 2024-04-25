import { LocalStorage } from "@utils/index"
import { Navigate } from "react-router-dom"

const NotAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const hasSession = new LocalStorage("TOKEN_KEY").exists()

  if (hasSession) return <Navigate to="/" replace />

  return children
}

export default NotAuthGuard
