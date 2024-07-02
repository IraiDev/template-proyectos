import { useAuth } from "@modules/auth/hooks/use_auth"
import { LocalStorage } from "@helpers/local_storage"
import { Navigate } from "react-router-dom"

const path = new LocalStorage("LAST_VISITED_URL")

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isSigningIn } = useAuth()

  if (!isSigningIn) return <Navigate to="/" replace />

  path.save(window.location.pathname)

  return (
    <main className="h-screen overflow-y-hidden flex bg-white">{children}</main>
  )
}

export default AuthGuard
