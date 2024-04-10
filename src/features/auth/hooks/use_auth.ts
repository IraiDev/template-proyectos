import { routes } from "@router/routes"
import { removeFromLocalStorage, saveInLocalStorage, sleep } from "@utils/index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../stores"

export function useAuth() {
  const user = authStore((state) => state.user)
  const [setUser, setSignIn] = authStore((state) => [state.setUser, state.setSignIn])

  const [isLoginLoading, setIsLoadingLogin] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const { user } = e.target as HTMLFormElement

    setIsLoadingLogin(true)
    sleep(3)
      .then((value) => {
        setSignIn(value)
        if (value) {
          setUser(user.value)
          saveInLocalStorage("TEST", user.value)
          navigate(`/${routes.private.home}`, { replace: true })
        }
      })
      .catch(() => {
        alert("error login")
      })
      .finally(() => {
        setIsLoadingLogin(false)
      })
  }

  const handleLogout = () => {
    setSignIn(false)
    setUser(null)
    removeFromLocalStorage("TEST")
  }

  return {
    user,
    handleLogin,
    handleLogout,
    isLoginLoading,
  }
}
