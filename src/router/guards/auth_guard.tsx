import { useAuth } from "@modules/auth/hooks"
import { saveInLocalStorage } from "@utils/local_storage"
import { Navigate } from "react-router-dom"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isSignIn } = useAuth()

  if (!isSignIn) return <Navigate to="/" replace />

  const { pathname } = window.location
  saveInLocalStorage("LAST_VISITED_URL", pathname)

  return <main className="h-screen overflow-y-hidden flex bg-white">{children}</main>
}

export default AuthGuard
