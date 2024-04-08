import { removeFromLocalStorage } from "@utils/functions"
import { AuthStore } from "../stores"

export function useLogout() {
  const setUser = AuthStore((s) => s.setUser)
  const setSignIn = AuthStore((s) => s.setSignIn)

  const handleLogout = () => {
    setSignIn(false)
    setUser(null)
    removeFromLocalStorage("TEST")
  }

  return {
    handleLogout,
  }
}
