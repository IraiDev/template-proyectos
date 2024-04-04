import { useAuthStore } from "../stores"

export function useLogout() {
  const setUser = useAuthStore((s) => s.setUser)
  const setSignIn = useAuthStore((s) => s.setSignIn)

  const handleLogout = () => {
    setSignIn(false)
    setUser(null)
    localStorage.removeItem("user")
  }

  return {
    handleLogout,
  }
}
