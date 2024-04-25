import { LocalStorage } from "@utils/index"
import { Navigate } from "react-router-dom"

const token = new LocalStorage("TOKEN_KEY")

const NotAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const hasSession = token.exists()

  if (hasSession) return <Navigate to="/" replace />

  return children
}

export default NotAuthGuard
