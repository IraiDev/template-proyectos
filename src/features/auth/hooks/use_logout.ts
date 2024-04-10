import { removeFromLocalStorage } from "@utils/index"
import { authStore } from "../stores"

export function useLogout() {
  const setUser = authStore((s) => s.setUser)
  const setSignIn = authStore((s) => s.setSignIn)

  const handleLogout = () => {
    setSignIn(false)
    setUser(null)
    removeFromLocalStorage("TEST")
  }

  return {
    handleLogout,
  }
}
